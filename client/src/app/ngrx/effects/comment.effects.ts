import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CommentService } from 'src/app/services/comment/comment.service';
import * as CommentActions from '../actions/comment.actions';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.get),
      exhaustMap((action) =>
        this.commentService.getComments(action.idToken, action.postId).pipe(
          map((commentlist) => {
            return CommentActions.getSuccess({ comments: commentlist });
          }),
          catchError((error) =>
            of(CommentActions.getFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.create),
      exhaustMap((action) =>
        this.commentService
          .createComment(action.comment, action.idToken, action.postId)
          .pipe(
            map(() => {
              return CommentActions.createSuccess();
            }),
            catchError((error) =>
              of(CommentActions.createFailure({ errorMessage: error }))
            )
          )
      )
    )
  );
}
