import { Group } from "src/app/models/group.model";

export interface GroupState {
    group: Group;
    groupList: Group[];
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
    isGetLoading: boolean;
    isGetSuccess: boolean;
}