import { createAction, props } from '@ngrx/store';
import { Storage } from '../../models/storage.model';

export const create = createAction(
  '[storage] Create ',
  props<{ file: File; id: string; idToken: string; uid: string }>()
);
export const createSuccess = createAction('[storage] Create Success');
export const createFailure = createAction(
  '[storage] Create Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction(
  '[storage] Get',
  props<{ id: string; idToken: string; uid: string }>()
);

export const getSuccess = createAction(
  '[storage] Get Success',
  props<{ storage: Storage }>()
);
export const getFailure = createAction(
  '[storage] Get Failure',
  props<{ errorMessage: any }>()
);
