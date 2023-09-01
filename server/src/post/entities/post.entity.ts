/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  authorId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: [] })
  media: string[];

  @Prop({ default: [] })
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  likes: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  shares: string[];

  @Prop({ default: [] })
  bookmarks: string[];

  @Prop({ default: false })
  isPrivate: boolean;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
