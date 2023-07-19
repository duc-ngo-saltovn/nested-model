import { CreateCommentDto } from '@/dto/comment.dto';
import { Comment } from '@/entity/comment.entity';
import { CommentService } from '@/services/comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() data: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(data);
  }

  @Get()
  findOne(
    @Query() query: { musicId: string; parentCommentId: string },
  ): Promise<Comment[]> {
    return this.commentService.findOneByParentId(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id);
  }
}
