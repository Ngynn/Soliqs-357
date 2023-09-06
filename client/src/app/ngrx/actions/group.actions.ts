import { createAction, props } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';

export const create = createAction('[Group] Create', props<{ group: Group; idToken: string }>());

export const createSuccess = createAction('[Group] Create Success');

export const createFailure = createAction(
  '[Group] Create Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction('[Group] Get ');

export const getSuccess = createAction(
  '[Group] Get Success',
  props<{ groupList: Group[] }>()
);

export const getFailure = createAction(
  '[Group] Get Failure',
  props<{ errorMessage: any }>()
);

export const update = createAction(
  '[Group] Update',
  props<{ id: string; group: Group }>()
);

export const updateSuccess = createAction('[Group] Update Success');

export const updateFailure = createAction(
  '[Group] Update Failure',
  props<{ errorMessage: any }>()
);

export const join = createAction(
  '[Group] Join',
  props<{ id: string; uid: string; idToken: string }>()
);

export const joinSuccess = createAction('[Group] Join Success');

export const joinFailure = createAction(
  '[Group] Join Failure',
  props<{ errorMessage: any }>()
);

export const getDetail = createAction(
  '[Group] Get Detail',
  props<{ id: string, idToken: string }>()
);

export const getDetailSuccess = createAction(
  '[Group] Get Detail Success',
  props<{ group: Group }>()
);

export const getDetailFailure = createAction(
  '[Group] Get Detail Failure',
  props<{ errorMessage: any }>()
);

