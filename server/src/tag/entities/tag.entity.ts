import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile', required: true })
  UID: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Posts', required: true })
  postId: string[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
