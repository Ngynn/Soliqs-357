import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PostService } from "src/app/services/post/post.service";
import * as PostActions from '../actions/post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

    getPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostActions.get),
        exhaustMap((action) =>
            this.postService.getPosts(action.authorId).pipe(
                map((postlist) => {
                    return PostActions.getSuccess( {posts: postlist})
                }),
                catchError((error) => of(PostActions.getFailure({errorMessage: error})))
            )
        )
    )
    );
}