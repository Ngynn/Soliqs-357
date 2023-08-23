import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthService } from 'src/app/services/auth/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as AuthActions from '../../ngrx/actions/auth.actions';
import * as UserActions from '../../ngrx/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  idToken$ = this.store.select('auth', 'idToken');
  isSuccessful$ = this.store.select('auth', 'isSuccessful');
  errorMessage$ = this.store.select('user', 'errorMessage');

  isToken: string = '';

  subscriptions: Subscription[] = [];

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    private _snackBar: MatSnackBar
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let user = getAuth().currentUser;
        let idToken = await user!.getIdToken(true);
        this.store.dispatch(AuthActions.storedIdToken(idToken));
      }
    });

    this.subscriptions.push(
      this.idToken$.subscribe((token) => {
        if (token) {
          console.log(token);
          this.isToken = token;
        }
      }),

      this.isSuccessful$.subscribe((isSuccessful) => {
        if (isSuccessful) {
          this.store.dispatch(
            UserActions.createUser({ idToken: this.isToken })
          );
        }
      }),

      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          this.openSnackBar(errorMessage);
          // console.log(errorMessage);
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
