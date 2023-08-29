/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Posts>

@Schema({ timestamps: true })
export class Posts {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    authorId: string;

    @Prop({ required: true })
    authorName: string;

    @Prop({ required: true })
    authorUsername: string;

    @Prop({ required: true })
    authorAvatar: string;


    @Prop({ required: true })
    content: string;

    @Prop()
    likes: string[];

    @Prop()
    comments: string[];

    @Prop()
    shares: string[];

    @Prop()
    media: string[];

    @Prop()
    tags: string[];

    @Prop()
    bookmarks: string[];

    @Prop()
    isPrivate: boolean;

}

export const PostSchema = SchemaFactory.createForClass(Posts);



