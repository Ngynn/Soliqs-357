import { createReducer, on } from "@ngrx/store";
import { GroupState } from "../states/group.state";
import * as GroupAction from "../actions/group.actions";

export const initualState: GroupState = {
    groups: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    isGetLoading: false,
    isGetSuccess: false,
    getErrorMessage: '',
};

export const groupReducer = createReducer(
    initualState,
    on(GroupAction.create, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            isSuccess: false,
            errorMessage: '',
        }
    }),

    on(GroupAction.createSuccess, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: false,
            isSuccess: true,
            errorMessage: '',
        }
    }),

    on(GroupAction.createFailure, (state, { type, errorMessage }) => {
        console.log(type)
        return {
            ...state,
            isLoading: false,
            isSuccess: false,
            errorMessage,
        }
    }),
    
    on(GroupAction.get, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrorMessage: '',
            groups: []
        }
    }),

    on(GroupAction.getSuccess, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            getErrorMessage: '',
            groups: action.groups
        }
    }),

    on(GroupAction.getFailure, (state, { type, errorMessage }) => {
        console.log(type)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrorMessage: errorMessage,
            groups: []
        }
    }),

    
);
