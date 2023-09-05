/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  owner: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  members: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  posts: string[];

  @Prop({ default: false })
  isPrivate: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
