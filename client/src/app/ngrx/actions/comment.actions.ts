import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/models/comment.model';

export const create = createAction(
  '[Comment] Create',
  props<{ comment: any; idToken: string; postId: string }>()
);

export const createSuccess = createAction('[Comment] Create Success');

export const createFailure = createAction(
  '[Comment] Create Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction(
  '[Comment] Get ',
  props<{ postId: string; idToken: string }>()
);
export const getSuccess = createAction(
  '[Comment] Get Success',
  props<{ comments: Comment[] }>()
);
export const getFailure = createAction(
  '[Comment] Get Failure',
  props<{ errorMessage: any }>()
);

export const update = createAction(
  '[Comment] Update',
  props<{ comment: Comment; idToken: string }>()
);

export const updateSuccess = createAction('[Comment] Update Success');

export const updateFailure = createAction(
  '[Comment] Update Failure',
  props<{ errorMessage: any }>()
);
