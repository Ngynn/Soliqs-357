import { createAction, props } from "@ngrx/store";
import { Group } from "src/app/models/group.model";



export const create = createAction(
    '[Group] Create',
    props<{ group: Group}>()
);

export const createSuccess = createAction(
    '[Group] Create Success');

export const createFailure = createAction(
    '[Group] Create Failure',
    props<{ errorMessage: any }>()
);

export const get = createAction(
    '[Group] Get ', props<{name: string}>()
);

export const getSuccess = createAction(
    '[Group] Get Success',
    props<{ groups: Group[] }>()
);

export const getFailure = createAction(
    '[Group] Get Failure',
    props<{ errorMessage: any }>()
);