import { Profile } from './profile.model';

export interface Group {
  _id: string;
  name: string;
  owner: string;
  members: Profile[];
  posts: string[];
  isPrivate: boolean;
}
