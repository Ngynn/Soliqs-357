import { createAction, props } from '@ngrx/store';

export const getIdToken = createAction(
  '[idToken] get idToken',
  props<{ idToken: string }>()
);
