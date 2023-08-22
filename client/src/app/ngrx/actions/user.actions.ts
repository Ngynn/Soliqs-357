import { createAction, props } from '@ngrx/store';

export const createUser = createAction(
  '[User] Create User',
  props<{ idToken: string }>()
);
export const createUserSuccess = createAction('[User] Create User Success');

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ errorMessage: any }>()
);
