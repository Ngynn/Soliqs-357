import { createReducer, on } from '@ngrx/store';
import { GroupState } from '../states/group.state';
import * as GroupAction from '../actions/group.actions';
import { Group } from 'src/app/models/group.model';

export const initualState: GroupState = {
  group: <Group>{},
  groupList: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
};

export const groupReducer = createReducer(
  initualState,
  on(GroupAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(GroupAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),

  on(GroupAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),

  on(GroupAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrorMessage: '',
      groupList: [],
    };
  }),

  on(GroupAction.getSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrorMessage: '',
      groupList: action.groupList,
    };
  }),

  on(GroupAction.getFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrorMessage: errorMessage,
      groupList: [],
    };
  }),

  on(GroupAction.update, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(GroupAction.updateSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),

  on(GroupAction.updateFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),

  on(GroupAction.join, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(GroupAction.joinSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),

  on(GroupAction.joinFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),

  on(GroupAction.getDetail, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrorMessage: '',
      group: <Group>{},
    };
  }),

  on(GroupAction.getDetailSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrorMessage: '',
      group: action.group,
    };
  }),

  on(GroupAction.getDetailFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrorMessage: errorMessage,
      group: <Group>{},
    };
  })
  

);
