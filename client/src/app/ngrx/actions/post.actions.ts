import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";
import { User } from "src/app/models/user.model";

export const create = createAction(
    '[Post] Create',
    props<{ post: any, idToken: string}>()
);

export const createSuccess = createAction(
    '[Post] Create Success');

export const createFailure = createAction(
    '[Post] Create Failure',
    props<{ errorMessage: any }>()
);

export const get = createAction(
    '[Post] Get ', props<{ idToken: string}>()
);
export const getSuccess = createAction(
    '[Post] Get Success',
    props<{ posts: Post[] }>()
);
export const getFailure = createAction(
    '[Post] Get Failure',
    props<{ errorMessage: any }>()
);