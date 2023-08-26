import { createReducer, on } from '@ngrx/store';
import { ProfileState } from '../states/profile.state'; 
import * as ProfileAction from '../actions/profile.actions';
import { state } from '@angular/animations';
import { Profile } from 'src/app/models/profile.model'; 

export const initualState: ProfileState = {
    profile: <Profile>{},
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  };
  export const profileReducer = createReducer(
    initualState,
    on(ProfileAction.createProfile, (state, action) => {
      console.log(action.type);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        errorMessage: '',
      };
    }),
    on(ProfileAction.createProfileSuccess, (state, action) => {
      console.log(action.type);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        errorMessage: '',
      };
    }),
    on(ProfileAction.createProfileFailure, (state, { type, errorMessage }) => {
      console.log(type, errorMessage);
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMessage,
      };
    })
  );
  