import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TagDocument = HydratedDocument<Tag>

@Schema({timestamps: true})
export class Tag {
    @Prop({ required: true, unique: true})
    id: string;
    @Prop({required: true})
    uid: string;
    @Prop({required: true})
    idPost: string;
}


export const TagSchema = SchemaFactory.createForClass(Tag);