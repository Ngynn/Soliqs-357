import { Profile } from "src/app/models/profile.model";


export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: any;
}
