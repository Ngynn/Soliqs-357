import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';

import { AuthState } from 'src/app/ngrx/states/auth.state';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as AuthActions from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  idToken$ = this.store.select('auth', 'idToken');
  isSuccessful$ = this.store.select('auth', 'isSuccessful');

  uid: string = '';
  isToken: string = '';
  subscriptions: Subscription[] = [];

  user: User = <User>{};
  userFirebase: any = null;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}

  loginWithGoogle() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  openSnackBar(message: any) {
    this._snackBar.open(message.error.message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
