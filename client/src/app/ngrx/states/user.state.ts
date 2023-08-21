import { Observable } from "rxjs";

export interface UserState{
    isLoading: boolean;
    isSuccess: boolean;
    message: any;
    error: string;
}