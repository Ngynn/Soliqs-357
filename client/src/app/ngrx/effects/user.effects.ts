import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from 'src/app/services/user/user.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import * as UserAction from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.create),
      switchMap((action) => {
        return this.userService.create(action.idToken);
      }),
      map(() => {
        return UserAction.createSuccess();
      }),
      catchError((error) => {
        return of(UserAction.createFailure({ errorMessage: error }));
      })
    )
  );

  getUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.get),
      exhaustMap((action) =>
        this.userService.get(action.uid, action.idToken).pipe(
          map((user) => {
            return UserAction.getSuccess({ user: user });
          }),
          catchError((error) =>
            of(UserAction.getFailure({ errorMessage: error }))
          )
        )
      )
    )
  );
}
