/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true, unique: true })
    authorId: string;

    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    avatar: string;


    @Prop()
    likes: string[];

    @Prop()
    comments: string[];

    @Prop()
    shares: string[];

    @Prop()
    picture: string;

    @Prop()
    content: string;

    


}

export const PostSchema = SchemaFactory.createForClass(Post);



