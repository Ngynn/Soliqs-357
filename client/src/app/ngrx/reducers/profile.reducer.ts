import { createReducer, on } from '@ngrx/store';
import { ProfileState } from '../states/profile.state';
import * as ProfileAction from '../actions/profile.actions';
import { Profile } from 'src/app/models/profile.model';

export const initualState: ProfileState = {
  profile: <Profile>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
};

export const profileReducer = createReducer(
  initualState,
  on(ProfileAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(ProfileAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),

  on(ProfileAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),

  on(ProfileAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(ProfileAction.getSuccess, (state, { type, profile }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
      profile,
    };
  }),

  on(ProfileAction.getFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  })
);
