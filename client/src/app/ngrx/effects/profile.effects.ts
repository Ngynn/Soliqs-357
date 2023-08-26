import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { catchError, map, of, switchMap } from 'rxjs';

import * as ProfileAction from '../actions/profile.actions';


@Injectable()
export class ProfileEffect {
  constructor(private action$: Actions, private profileService: ProfileService) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.createProfile),
      switchMap((action) => {
        return this.profileService.createProfile(action.profile,action.user);
      }),
      map(() => {
        return ProfileAction.createProfileSuccess();
      }),
      catchError((error) => {
        return of(ProfileAction.createProfileFailure({ errorMessage: error }));
      })
    )
  );
}