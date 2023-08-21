import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const createUser = createAction('[user] create user',props<{idToken:string}>());
export const createUserSuccess = createAction('[user] creat user success',props<{message:any}>())
export const createUserFailure = createAction(
    '[user] create user failure',
    props<{errorMessage: any}>()
)