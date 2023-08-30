import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StorageDocument = HydratedDocument<Storage>;

@Schema({ timestamps: true })
export class Storage {
  @Prop()
  folderName: string;

  @Prop()
  urls: string[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
