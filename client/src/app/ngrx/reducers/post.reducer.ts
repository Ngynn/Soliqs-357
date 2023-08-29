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
    on(PostAction.create, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            isSuccess: false,
            errorMessage: '',
        }
    }),

    on(PostAction.createSuccess, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: false,
            isSuccess: true,
            errorMessage: '',
        }
    }),

    on(PostAction.createFailure, (state, { type, errorMessage }) => {
        console.log(type)
        return {
            ...state,
            isLoading: false,
            isSuccess: false,
            errorMessage,
        }
    }),
    
    
    on(PostAction.get, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrorMessage: '',
            posts: []
        }
    }),
    on(PostAction.getSuccess, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            getErrorMessage: '',
            posts: action.posts
        }
    }),
    on(PostAction.getFailure, (state, { type, errorMessage }) => {
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