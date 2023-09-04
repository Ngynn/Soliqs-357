import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';

export const create = createAction(
  '[Profile] Create ',
  props<{ profile: Profile }>()
);

export const createSuccess = createAction('[Profile] Create Success');

export const createFailure = createAction(
  '[Profile] Create Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction(
  '[Profile] Get',
  props<{ id: string; idToken: string }>()
);

export const getSuccess = createAction(
  '[Profile] Get Success',
  props<{ profile: Profile }>()
);

export const getFailure = createAction(
  '[Profile] Get Failure',
  props<{ errorMessage: any }>()
);
