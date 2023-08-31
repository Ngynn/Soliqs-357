import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile', required: true })
  users: string[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
