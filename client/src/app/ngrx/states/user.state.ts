import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User;
  isLoading: boolean;
  isSuccess: boolean;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  isGetFailure: boolean;
  errorMessage: any;
  errorGetMessage: any;
}
