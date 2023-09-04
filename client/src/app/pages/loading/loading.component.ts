import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserState } from 'src/app/ngrx/states/user.state';

import * as UserActions from '../../ngrx/actions/user.actions';
import { Subscription, combineLatest, mergeMap } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 200;

  idToken: string = '';
  uid: string = '';
  subscriptions: Subscription[] = [];

  idToken$ = this.store.select('auth', 'idToken');
  user$ = this.store.select('user', 'user');
  firebaseUser$ = this.store.select('auth', 'firebaseUser');
  isSuccess$ = this.store.select('auth', 'isSuccessful');
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    this.subscriptions.push(
      combineLatest([
        this.idToken$,
        this.user$,
        this.firebaseUser$,
        this.isSuccess$,
        this.isGetSuccess$,
      ]).subscribe(([idToken, user, firebaseUser, isSuccess, isGetSuccess]) => {
        if (!isSuccess && !isGetSuccess) {
          this.store.dispatch(UserActions.createUser({ idToken }));
        }
        if (isGetSuccess && user.uid) {
          if (user.profile != null) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/register']);
          }
        }
        if (firebaseUser.uid && idToken && isSuccess) {
          if (firebaseUser.uid != this.uid && idToken != this.idToken) {
            this.uid = firebaseUser.uid;
            this.idToken = idToken;
            this.store.dispatch(
              UserActions.getUser({ uid: firebaseUser.uid, idToken })
            );
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
}
