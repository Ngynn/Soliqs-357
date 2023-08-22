import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    uid: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    name: string;
    
    @Prop()
    picture: string;
}
export const UserSchema = SchemaFactory.createForClass(User)
