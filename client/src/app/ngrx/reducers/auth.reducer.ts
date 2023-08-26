import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  idToken: '',
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
  islogoutLoading: false,
  isLogoutSuccess:false,
  errorLogOutMessage: ''
};
export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
  }),

  on(AuthActions.loginSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
  }),

  on(AuthActions.loginFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: false,
      islogoutLoading: true,
      isLogoutSuccess: false,
      errorLogOutMessage: '',
    };
  }),

  on(AuthActions.logoutSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      islogoutLoading: false,
      isLogoutSuccess: true,
      errorLogOutMessage: '',
    };
  }),

  on(AuthActions.logoutFailure, (state, { errorLogOutMessage, type }) => {
    console.log(type);
    return {
      ...state,
      islogoutLoading: false,
      isLogoutSuccess: false,
      errorLogOutMessage,
    };
  }),

  on(AuthActions.storedIdToken, (state, { idToken, type }) => {
    console.log(type);
    return {
      ...state,
      idToken,
    };
  })
);
