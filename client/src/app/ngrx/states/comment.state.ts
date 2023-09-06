import { Comment } from 'src/app/models/comment.model';

export interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: any;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
}
