import { createAction, props } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';

export const create = createAction(
  '[Group] Create',
  props<{ idToken: string; group: any }>()
);

export const createSuccess = createAction('[Group] Create Success');

export const createFailure = createAction(
  '[Group] Create Failure',
  props<{ errorMessage: any }>()
);

export const getAll = createAction(
  '[Group] Get All',
  props<{ idToken: string; uid: string }>()
);

export const getAllSuccess = createAction(
  '[Group] Get All Success',
  props<{ groupList: Group[] }>()
);

export const getAllFailure = createAction(
  '[Group] Get All Failure',
  props<{ errorMessage: any }>()
);

export const update = createAction(
  '[Group] Update',
  props<{ idToken: string; id: string; group: Group }>()
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

export const getOne = createAction(
  '[Group] Get One',
  props<{ id: string; idToken: string }>()
);

export const getOneSuccess = createAction(
  '[Group] Get One Success',
  props<{ group: Group }>()
);

export const getOneFailure = createAction(
  '[Group] Get One Failure',
  props<{ errorMessage: any }>()
);

export const getJoined = createAction(
  '[Group] Get Joined',
  props<{ uid: string; idToken: string }>()
);

export const getJoinedSuccess = createAction(
  '[Group] Get Joined Success',
  props<{ groupJoined: Group[] }>()
);

export const getJoinedFailure = createAction(
  '[Group] Get Joined Failure',
  props<{ errorMessage: any }>()
);
