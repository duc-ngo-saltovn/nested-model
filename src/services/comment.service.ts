import { CreateCommentDto } from '@/dto/comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from '@/schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(args: CreateCommentDto): Promise<Comment> {
    const comment = new Comment({
      music_id: args.musicId,
      user_id: args.userId,
      parent_comment_id: args.parentCommentId,
      content: args.content,
    });

    let rightValue = 1;

    if (args.parentCommentId) {
      const commentParent = await this.commentModel.findById(
        args.parentCommentId,
      );
      if (!commentParent) {
        throw new NotFoundException('Parent comment not found');
      }
      rightValue = commentParent.right;

      await this.commentModel.updateMany(
        {
          music_id: args.musicId,
          right: { $gte: rightValue },
        },
        {
          $inc: { right: 2 },
        },
      );

      await this.commentModel.updateMany(
        {
          music_id: args.musicId,
          left: { $gt: rightValue },
        },
        {
          $inc: { left: 2 },
        },
      );
    } else {
      const maxRightValue = await this.commentModel.findOne(
        { music_id: args.musicId },
        'right',
        { sort: { right: -1 } },
      );
      rightValue = maxRightValue ? maxRightValue.right + 1 : 1;
    }

    comment.left = rightValue;
    comment.right = rightValue + 1;

    return await this.commentModel.create(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find();
  }

  async findOneByParentId(args: {
    musicId: string;
    parentCommentId?: string;
  }): Promise<Comment[]> {
    const { musicId, parentCommentId = null } = args;

    const selectFields = {
      left: 1,
      right: 1,
      content: 1,
      parent_comment_id: 1,
    };

    let condition = {};

    if (parentCommentId) {
      const parent = await this.commentModel.findById(parentCommentId);

      if (!parent) {
        throw new NotFoundException(`Comment id: ${parentCommentId} not found`);
      }

      condition = {
        music_id: musicId,
        left: { $gt: parent.left }, // lơn hơn left
        right: { $lte: parent.right }, // Nhở hơn right
      };
    } else {
      condition = {
        music_id: musicId,
        parent_comment_id: parentCommentId,
      };
    }

    return await this.commentModel
      .find(condition)
      .select(selectFields)
      .sort({
        left: 1,
      })
      .limit(10)
      .skip(0);
  }

  async remove(id: string): Promise<void> {
    await this.commentModel.deleteOne({ id: id });
  }
}
