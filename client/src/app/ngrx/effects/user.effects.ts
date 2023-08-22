import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserAction from '../actions/user.actions';
import { UserService } from 'src/app/services/user/user.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class Userffects {
  constructor(private action$: Actions, private userService: UserService) {}
  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.createUser),
      exhaustMap((action) =>
        this.userService.createUser(action.idToken).pipe(
          map((message) => UserAction.createUserSuccess({ message: message })),
          catchError((error) =>
            of(UserAction.createUserFailure({ errorMessage: error }))
          )
        )
      )
    )
  );
}
