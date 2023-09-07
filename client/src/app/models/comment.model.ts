import { Profile } from './profile.model';
export interface Comment {
  _id: string;
  postId: string;
  authorId: Profile;
  content: string;
  createdAt: string;
}
