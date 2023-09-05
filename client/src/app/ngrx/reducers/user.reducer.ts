import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserAction from '../actions/user.actions';
import { User } from 'src/app/models/user.model';

export const initualState: UserState = {
  user: <User>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
  isGetFailure: false,
  errorGetMessage: '',
};
export const userReducer = createReducer(
  initualState,
  on(UserAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),
  on(UserAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),
  on(UserAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),
  on(UserAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      isGetFailure: false,
      errorGetMessage: '',
      user: <User>{},
    };
  }),
  on(UserAction.getSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      isGetFailure: false,
      errorGetMessage: '',
      user: action.user,
    };
  }),
  on(UserAction.getFailure, (state, { type, errorGetMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      isGetFailure: true,
      errorGetMessage,
      user: <User>{},
    };
  })
);
