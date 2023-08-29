import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subscription, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';

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

  user$ = this.store.select('user', 'user');
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');
  isCreateSuccess$ = this.store.select('user', 'isSuccess');
  errorMessage$ = this.store.select('user', 'errorMessage');

  uid: string = '';
  isToken: string = '';
  subscriptions: Subscription[] = [];

  user: User = <User>{};
  userFirebase: any = null;

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      console.log(user + 'User firebase');
      if (user) {
        this.userFirebase = user;
        let idToken = await user!.getIdToken(true);
        this.isToken = idToken;
        this.store.dispatch(AuthActions.storedIdToken(idToken));
        this.store.dispatch(UserActions.getUser({ uid: user.uid }));
      } else {
        this.store.dispatch(AuthActions.storedIdToken(''));
        this.router.navigate(['/login']);
      }

    });

    this.subscriptions.push(
      this.store
        .select('user', 'isGetSuccess')
        .pipe(
          mergeMap((isGetSuccess) => {
            if (isGetSuccess) {
              return this.user$;
            } else {
              return [];
            }
          })
        )
        .subscribe((user) => {
          if (user && this.userFirebase) {
            console.log('user data', user);
            // console.log(this.userFirebase+ 'user firebase')
            if (user.profile === null) {
              console.log('vô ở đây');
              this.router.navigate(['/loading']);
            } else if (user.profile) {
              console.log('vô ở đây');
              this.router.navigate(['/loading']);
            }
          } else {
            // console.log('idtoken in login: '+ this.isToken);
            // this.store.dispatch(
            //   UserActions.createUser({ idToken: this.isToken })
            // );
          }
        }),

      this.idToken$.subscribe((idToken) => {
        if (idToken && this.userFirebase) {
          this.isToken = idToken;
          console.log(idToken);
          this.store.dispatch(UserActions.createUser({ idToken: idToken }));
        }
      }),
      this.idToken$.subscribe((idToken) => {
        if (idToken) {
          this.isToken = idToken;
          this.store.dispatch(
            UserActions.createUser({ idToken: this.isToken })
          );
        }
      }),

      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess && this.userFirebase) {
          console.log('vô ở đây');

          this.router.navigate(['/loading']);
        }
      }),

      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage && this.userFirebase) {
          console.log(errorMessage);
          this.router.navigate(['/loading']);
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
