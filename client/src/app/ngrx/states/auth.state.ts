import { User } from 'src/app/models/user.model';

export interface AuthState {
  idToken: string;
  firebaseUser: User;
  isLoading: boolean;
  isSuccessful: boolean;
  errorMessage: string;
  islogoutLoading: boolean;
  isLogoutSuccess: boolean;
}
