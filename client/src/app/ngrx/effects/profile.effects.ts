import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { catchError, map, of, switchMap } from 'rxjs';

import * as ProfileAction from '../actions/profile.actions';

@Injectable()
export class ProfileEffect {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.create),
      switchMap((action) => {
        return this.profileService.create(action.profile);
      }),
      map(() => {
        return ProfileAction.createSuccess();
      }),
      catchError((error) => {
        return of(ProfileAction.createFailure({ errorMessage: error }));
      })
    )
  );

  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.get),
      switchMap((action) => {
        return this.profileService.get(action.id);
      }),
      map((profile) => {
        return ProfileAction.getSuccess({ profile });
      }),
      catchError((error) => {
        return of(ProfileAction.getFailure({ errorMessage: error }));
      })
    )
  );
}
