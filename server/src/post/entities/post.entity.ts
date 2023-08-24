import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true })
    uid: string;


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


