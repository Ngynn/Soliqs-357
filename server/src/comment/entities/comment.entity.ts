import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Posts', required: true })
  postId: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile', required: true })
  authorId: string;

  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
