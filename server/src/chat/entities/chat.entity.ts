import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({timestamps: true})
export class Chat {
    @Prop()
    name: string;
    @Prop({required: true})
    userId: string;
    @Prop({required: true})
    messages: string

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
