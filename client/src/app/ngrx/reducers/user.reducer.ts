import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserAction from '../actions/user.actions';
import { state } from '@angular/animations';

export const initualState: UserState = {
  isLoading: false,
  isSuccess: false,
  message: {},
  error: '',
};
export const UserReducer = createReducer(
  initualState,
  on(UserAction.createUser, (state, action) => {
    console.log(action.type);
    let newState = {
      ...state,
      isLoading: true,
      isSuccess: false,
      message: {},
      error: '',
    };
    return newState;
  }),
  on(UserAction.createUserSuccess, (state, action) => {
    console.log(action.type);
    let newState = {
      ...state,
      isLoading: false,
      isSuccess: true,
      message: action.message,
      error: '',
    };
    return newState;
  }),
  on(UserAction.createUserFailure, (state, action) => {
    console.log(action.type);
    let newState = {
      ...state,
      isLoading: false,
      isSuccess: false,
      message: {},
      error: action.errorMessage,
    };
    return newState;
  })
);
