import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';

export const createProfile = createAction(
  '[Profile] Create Profile',
  props<{ profile: Profile, user: User }>(),

);
export const createProfileSuccess = createAction('[Profile] Create Profile Success');

export const createProfileFailure = createAction(
  '[Profile] Create Profile Failure',
  props<{ errorMessage: any }>()
);
