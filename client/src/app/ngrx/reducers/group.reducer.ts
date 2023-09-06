import { createReducer, on } from '@ngrx/store';
import { GroupState } from '../states/group.state';
import * as GroupAction from '../actions/group.actions';
import { Group } from 'src/app/models/group.model';

export const initualState: GroupState = {
  group: <any>{},
  groupJoined: [],
  groupList: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
  isGettingJoined: false,
  isGetJoinedSuccess: false,
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

  on(GroupAction.getAll, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      errorMessage: '',
      groupList: [],
    };
  }),

  on(GroupAction.getAllSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      errorMessage: '',
      groupList: action.groupList,
    };
  }),

  on(GroupAction.getAllFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      errorMessage: errorMessage,
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

  on(GroupAction.getOne, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      errorMessage: '',
      group: <Group>{},
    };
  }),

  on(GroupAction.getOneSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      errorMessage: '',
      group: action.group,
    };
  }),

  on(GroupAction.getOneFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      errorMessage: errorMessage,
      group: <Group>{},
    };
  }),

  on(GroupAction.getJoined, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGettingJoined: true,
      isGetJoinedSuccess: false,
      getErrorMessage: '',
      groupJoined: [],
    };
  }),

  on(GroupAction.getJoinedSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGettingJoined: false,
      isGetJoinedSuccess: true,
      errorMessage: '',
      groupJoined: action.groupJoined,
    };
  }),

  on(GroupAction.getJoinedFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGettingJoined: false,
      isGetJoinedSuccess: false,
      errorMessage: errorMessage,
      groupJoined: [],
    };
  })
);
