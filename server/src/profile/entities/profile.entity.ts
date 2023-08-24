import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop()
  userName: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop()
  coverImg: string;

  @Prop()
  followers: number;

  @Prop()
  following: number;

  @Prop()
  blocked: string[];

  @Prop()
  posts: string[];

  @Prop()
  messages: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
