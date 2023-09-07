import { createReducer, on } from '@ngrx/store';
import { CommentState } from '../states/comment.state';
import * as CommentAction from '../actions/comment.actions';

export const initualState: CommentState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
  isCreateLoading: false,
  isCreateSuccess: false,
};

export const commentReducer = createReducer(
  initualState,
  on(CommentAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      errorMessage: '',
    };
  }),

  on(CommentAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
      errorMessage: '',
    };
  }),

  on(CommentAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type, errorMessage);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      errorMessage,
    };
  }),

  on(CommentAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      errorMessage: '',
      comments: [],
    };
  }),
  on(CommentAction.getSuccess, (state, action) => {
    console.log(action.type);
    console.log(action.comments);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      errorMessage: '',
      comments: action.comments,
    };
  }),

  on(CommentAction.getFailure, (state, { type, errorMessage }) => {
    console.log(type, errorMessage);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      errorMessage,
      comments: [],
    };
  }),

  on(CommentAction.clearAllState, (state) => {
    return {
      ...state,
      comments: [],
      isLoading: false,
      isSuccess: false,
      errorMessage: '',
      isGetLoading: false,
      isGetSuccess: false,
      isCreateLoading: false,
      isCreateSuccess: false,
    };
  })
);
