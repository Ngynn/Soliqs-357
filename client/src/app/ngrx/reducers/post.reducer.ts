import { createReducer, on } from "@ngrx/store";
import { PostState } from "../states/post.state";
import * as PostAction from "../actions/post.actions";
import { Post } from "src/app/models/post.model";

export const initualState: PostState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    isGetLoading: false,
    isGetSuccess: false,
    getErrorMessage: '',
    isGetByIdSuccess: false,
    isGetByIdLoading: false,
    post: <Post>{}
};

export const postReducer = createReducer(
  initualState,
  on(PostAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(PostAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),


    
  

    on(PostAction.getById, (state, action)=>{
        console.log(action.type)
        console.log(action.idToken);
        
        return {
            ...state,
            isGetByIdLoading: true,
            isGetByIdSuccess: false,
            getErrorMessage: '',
            post: <Post>{}
        }
    }),
    on(PostAction.getByIdSuccess, (state, action)=>{
        console.log(action.type)
        return {
            ...state,
            isGetByIdLoading: false,
            isGetByIdSuccess: true,
            getErrorMessage: '',
            post: action.post
        }
    }),
    on(PostAction.getByIdFailure, (state, action) => {
        console.log(action.type)
        console.log(action.errorMessage);
        
        return {
            ...state,
            isGetByIdLoading: false,
            isGetByIdSuccess: false,
            getErrorMessage: action.errorMessage,
            post: <Post>{}
        }
    }),
    on(PostAction.createFailure, (state, { type, errorMessage }) => {
      console.log(type, errorMessage);
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMessage,
      };
    }),
  
    on(PostAction.get, (state, action) => {
      console.log(action.type);
      return {
        ...state,
        isGetLoading: true,
        isGetSuccess: false,
        getErrorMessage: '',
      };
    }),
    on(PostAction.getSuccess, (state, action) => {
      console.log(action.type);
      return {
        ...state,
        isGetLoading: false,
        isGetSuccess: true,
        getErrorMessage: '',
        posts: [...state.posts, ...action.posts],
      };
    }),
    on(PostAction.getFailure, (state, { type, errorMessage }) => {
      console.log(type, errorMessage);
      return {
        ...state,
        isGetLoading: false,
        isGetSuccess: false,
        getErrorMessage: errorMessage,
        posts: [],
      };
    })
);

