import { Group } from 'src/app/models/group.model';

export interface GroupState {
  group: any;
  groupJoined: Group[];
  groupList: Group[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: any;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  isGettingJoined: boolean;
  isGetJoinedSuccess: boolean;
}
