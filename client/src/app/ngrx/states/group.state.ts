import { Group } from "src/app/models/group.model";

export interface GroupState {
    groups: Group[];
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrorMessage: any;
}