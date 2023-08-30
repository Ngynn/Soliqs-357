import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MessageDocument = HydratedDocument<Message>

@Schema({timestamps: true})
export class Message {
    @Prop({required: true})
    sender: string;
    @Prop({required: true})
    recipient: string;
    @Prop()
    content: string;
    @Prop()
    created_At: string

}

export const MessageSchema = SchemaFactory.createForClass(Message);
