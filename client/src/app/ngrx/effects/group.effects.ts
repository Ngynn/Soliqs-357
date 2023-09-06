import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { GroupService } from 'src/app/services/group/group.service';
import * as GroupActions from '../actions/group.actions';

@Injectable()
export class GroupEffects {
  constructor(private actions$: Actions, private groupService: GroupService) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getAll),
      exhaustMap((action) =>
        this.groupService.getAll(action.idToken, action.uid).pipe(
          map((grouplist) => {
            return GroupActions.getAllSuccess({ groupList: grouplist });
          }),
          catchError((error) =>
            of(GroupActions.getAllFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.create),
      exhaustMap((action) =>
        this.groupService.create(action.idToken, action.group).pipe(
          map(() => {
            return GroupActions.createSuccess();
          }),
          catchError((error) =>
            of(GroupActions.createFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.update),
      exhaustMap((action) =>
        this.groupService.update(action.idToken, action.id, action.group).pipe(
          map(() => {
            return GroupActions.updateSuccess();
          }),
          catchError((error) =>
            of(GroupActions.updateFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  join$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.join),
      exhaustMap((action) =>
        this.groupService.join(action.id, action.uid, action.idToken).pipe(
          map(() => {
            return GroupActions.joinSuccess();
          }),
          catchError((error) =>
            of(GroupActions.joinFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  getGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getOne),
      exhaustMap((action) =>
        this.groupService.getOne(action.id, action.idToken).pipe(
          map((group) => {
            return GroupActions.getOneSuccess({ group: group });
          }),
          catchError((error) =>
            of(GroupActions.getOneFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  getJoined$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getJoined),
      exhaustMap((action) =>
        this.groupService.getJoined(action.uid, action.idToken).pipe(
          map((groups) => {
            return GroupActions.getJoinedSuccess({ groupJoined: groups });
          }),
          catchError((error) =>
            of(GroupActions.getJoinedFailure({ errorMessage: error }))
          )
        )
      )
    )
  );
}
