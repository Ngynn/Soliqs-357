import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;
@Schema({timestamps: true})
export class Notification {
    @Prop({required: true, unique: true})
    id: string
    @Prop({required: true})
    uid: string;
    @Prop({ default: null })
    content: string;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification)
