import { Profile } from './profile.model';

export interface Group {
  find(arg0: (group: any) => boolean): unknown;
  _id: string;
  name: string;
  owner: string;
  members: Profile[];
  posts: string[];
  isPrivate: boolean;
}
