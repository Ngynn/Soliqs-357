import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";
import { User } from "src/app/models/user.model";

export const createPost = createAction(
    '[Post] Create Post',
    props<{ post: Post, uid:User }>()
);

export const createPostSuccess = createAction(
    '[Post] Create Post Success');

export const createPostFailure = createAction(
    '[Post] Create Post Failure',
    props<{ errorMessage: any }>()
);

export const getPosts = createAction(
    '[Post] Get Posts', props<{uid: string}>()
);
export const getPostsSuccess = createAction(
    '[Post] Get Posts Success',
    props<{ posts: Post[] }>()
);
export const getPostsFailure = createAction(
    '[Post] Get Posts Failure',
    props<{ errorMessage: any }>()
);