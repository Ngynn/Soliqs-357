import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: any;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrorMessage: any;
}
