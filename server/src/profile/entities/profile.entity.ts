import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProfileDocument = HydratedDocument<Profile>

@Schema({timestamps: true})
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
    phone: string;

    @Prop()
    avatar: string;

    @Prop()
    coverImg: string;
    @Prop()
    dateOfbirth: string;

    @Prop({default:null})
    followers: string[];

    @Prop({default:null})
    following: string[];

    @Prop({default:null})
    blocked: string[];
    

    @Prop({default:null})
    posts: string[];

    @Prop({default:null})
    messages: string[];


}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
