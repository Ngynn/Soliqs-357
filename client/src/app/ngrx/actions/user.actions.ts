import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const create = createAction(
  '[User] Create User',
  props<{ idToken: string }>()
);

export const createSuccess = createAction('[User] Create User Success');

export const createFailure = createAction(
  '[User] Create User Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction(
  '[User] Get',
  props<{ uid: string; idToken: string }>()
);

export const getSuccess = createAction(
  '[User] Get Success',
  props<{ user: User }>()
);

export const getFailure = createAction(
  '[User] Get Failure',
  props<{ errorGetMessage: any }>()
);
