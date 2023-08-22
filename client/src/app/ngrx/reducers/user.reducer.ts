import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserAction from '../actions/user.actions';
import { state } from '@angular/animations';
import { User } from 'src/app/models/user.model';

export const initualState: UserState = {
  user: <User>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
};
export const userReducer = createReducer(
  initualState,
  on(UserAction.createUser, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),
  on(UserAction.createUserSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),
  on(UserAction.createUserFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  })
);
