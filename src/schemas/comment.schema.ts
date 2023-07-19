import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  music_id: string;

  @Prop({ type: 'number' })
  user_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  parent_comment_id: string;

  @Prop({ type: 'number' })
  left: number;

  @Prop({ type: 'number' })
  right: number;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
