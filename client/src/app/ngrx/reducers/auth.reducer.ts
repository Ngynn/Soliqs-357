import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../states/auth.state';
import { User } from 'src/app/models/user.model';

export const initialState: AuthState = {
  idToken: '',
  firebaseUser: <User>{},
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
  islogoutLoading: false,
  isLogoutSuccess: false,
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
    };
  }),

  on(AuthActions.logoutSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      idToken: '',
      firebaseUser: <User>{},
      islogoutLoading: false,
      isLogoutSuccess: true,
      errorMessage: '',
      isSuccessful: false,
    };
  }),

  on(AuthActions.logoutFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      islogoutLoading: false,
      isLogoutSuccess: false,
      isSuccessful: false,
      errorMessage,
    };
  }),

  on(AuthActions.storedIdToken, (state, { idToken, type }) => {
    console.log(type);
    return {
      ...state,
      idToken,
    };
  }),

  on(AuthActions.storedFirebaseUser, (state, { firebaseUser, type }) => {
    console.log(type);
    return {
      ...state,
      firebaseUser,
    };
  })
);
