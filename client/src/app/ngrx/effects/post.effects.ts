import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import * as PostActions from '../actions/post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.get),
      switchMap((action) => {
        return this.postService.getPosts(
          action.idToken,
          action.page,
          action.pageSize
        );
      }),
      map((posts) => {
        return PostActions.getSuccess({ posts });
      }),
      catchError((error) => {
        return of(PostActions.getFailure({ errorMessage: error }));
      })
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.create),
      switchMap((action) =>
        this.postService.createPost(action.post, action.idToken).pipe(
          map(() => {
            return PostActions.createSuccess();
          }),
          catchError((error) =>
            of(PostActions.createFailure({ errorMessage: error }))
          )
        )
      )
    )
  );
}
