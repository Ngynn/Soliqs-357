export interface Profile {
  _id: string;
  id: string;
  userName: string;
  displayName: string;
  email: string;
  phone: string;
  country: string;
  avatar: string;
  cover: string;
  bio: string;
  gender: string;
  followers: string[];
  following: string[];
  blocked: string[];
}
