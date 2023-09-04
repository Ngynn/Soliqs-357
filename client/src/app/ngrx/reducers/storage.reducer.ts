import { createReducer, on } from "@ngrx/store";
import { StorageState } from "../states/storage.state";
import * as StorageAction from '../actions/storage.actions';
import {Storage} from '../../models/storage.model'


export const initualState: StorageState = {
    storage: <Storage>{},
    isCreateLoading: false,
    isCreateSuccess: false,
    createErrorMessage: '',
    isGetLoading: false,
    isGetSuccess: false,
    getErrorMessage: '',
};
export const storageReducer = createReducer(
    initualState,
    on(StorageAction.create, (state, action) =>{
        console.log(action.type)
        return {
            ...state,
            isCreateLoading: true,
            isCreateSuccess: false,
            createErrorMessage: '',
        }
    }),
    on(StorageAction.createSuccess, (state, action) =>{
        console.log(action.type)
        return {
            ...state,
            isCreateLoading: false,
            isCreateSuccess: true,
            createErrorMessage: '',
        }
    }),
    on(StorageAction.createFailure, (state, { type, errorMessage }) =>{
        console.log(type)
        console.log(errorMessage)
        return {
            ...state,
            isCreateLoading: false,
            isCreateSuccess: false,
            createErrorMessage: errorMessage,
        }
    }),
    on(StorageAction.get, (state, action)=>{
        console.log(action.type)
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrorMessage: '',
            storage: <Storage>{}
        }
    }),
    on(StorageAction.getSuccess,(state,action)=>{
        console.log(action.type)

        
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            getErrorMessage: '',
            storage: action.storage
        }
    }),
    on(StorageAction.getFailure, (state, {type, errorMessage})=>{
        console.log(type)
        console.log(errorMessage)
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrorMessage: errorMessage,
            storage: <Storage>{}
        }
    })
)