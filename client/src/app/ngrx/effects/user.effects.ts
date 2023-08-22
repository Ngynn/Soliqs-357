import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from 'src/app/services/user/user.service';
import { catchError, map, of, switchMap } from 'rxjs';

import * as UserAction from '../actions/user.actions';

@Injectable()
export class Userffects {
  constructor(private action$: Actions, private userService: UserService) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.createUser),
      switchMap((action) => {
        return this.userService.createUser(action.idToken);
      }),
      map(() => {
        return UserAction.createUserSuccess();
      }),
      catchError((error) => {
        return of(UserAction.createUserFailure({ errorMessage: error }));
      })
    )
  );
}
