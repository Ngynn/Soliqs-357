import { createReducer, on } from "@ngrx/store";
import { PostState } from "../states/post.state";
import * as PostAction from "../actions/post.actions";

export const initualState: PostState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    isGetLoading: false,
    isGetSuccess: false,
    getErrorMessage: '',
};

export const postReducer = createReducer(
    initualState,
    
    on(PostAction.getPosts, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrorMessage: '',
            posts: []
        }
    }),
    on(PostAction.getPostsSuccess, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            getErrorMessage: '',
            posts: action.posts
        }
    }),
    on(PostAction.getPostsFailure, (state, { type, errorMessage }) => {
        console.log(type)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrorMessage: errorMessage,
            posts: []
        }
    }),
);