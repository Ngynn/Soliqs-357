import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PostService } from "src/app/services/post/post.service";
import * as PostActions from '../actions/post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

    getPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostActions.getPosts),
        exhaustMap((action) =>
            this.postService.getPosts(action.uid).pipe(
                map((postlist) => {
                    return PostActions.getPostsSuccess( {posts: postlist})
                }),
                catchError((error) => of(PostActions.getPostsFailure({errorMessage: error})))
            )
        )
    )
    );
}