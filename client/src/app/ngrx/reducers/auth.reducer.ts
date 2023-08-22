import { createReducer, on } from '@ngrx/store';
import * as AuthAction from '../actions/auth.actions';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  idToken: '',
  // ... other initial state properties
};
export const AuthReducer = createReducer(
  initialState,
  on(AuthAction.getIdToken, (state, action) => {
    console.log(action.type, action.idToken);
    return {
      ...state,
      idToken: action.idToken,
    };
  })
);
