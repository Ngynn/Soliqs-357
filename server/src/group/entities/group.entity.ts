/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type GroupDocument = HydratedDocument<Group>;

@Schema({timestamps: true})
export class Group {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    owner: string;
    @Prop()
    members: string[]
    @Prop()
    posts: string[]
    @Prop({default: false})
    is_Private: boolean
}

export const GroupSchema = SchemaFactory.createForClass(Group)
