import { Post } from "src/app/models/post.model";

export interface PostState {
    posts: Post[];
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrorMessage: any;
    isGetByIdSuccess: boolean;
    isGetByIdLoading: boolean;
    post: Post;
}