import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from '@/controllers/comment.controller';
import { CommentService } from '@/services/comment.service';
import { Comment, CommentSchema } from '@/schemas/comment.schema';

@Module({
  // imports: [TypeOrmModule.forFeature([Comment])],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentModule {}
