
import { Injectable } from '@angular/core';
import * as StorageAction from '../actions/storage.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageService } from 'src/app/services/storage/storage.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class StorageEffects {
    constructor(private action$: Actions, private storageService: StorageService) { }
    create$ = createEffect(() =>
        this.action$.pipe(
            ofType(StorageAction.create),
            switchMap((action) => {
                return this.storageService.create(action.file, action.id, action.idToken);
            }),
            map(() => {
                return StorageAction.createSuccess();
            }),
            catchError((error) => {
                return of(StorageAction.createFailure({ errorMessage: error }));
            })
        )
    );
    get$ = createEffect(() => this.action$.pipe(
        ofType(StorageAction.get),
        exhaustMap((action) =>
            this.storageService.getStorage(action.id,action.idToken).pipe(
                map((storage) => {
                    return StorageAction.getSuccess({ storage: storage })
                }),
                catchError((error) => of(StorageAction.getFailure({errorMessage: error})))
            )
        )
    )
    );


}
