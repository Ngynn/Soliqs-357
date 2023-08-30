import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile', required: true })
  sender: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile', required: true })
  recipient: string;

  @Prop()
  content: string;

  @Prop()
  created_At: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
