import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrx/states/auth.state';

import * as AuthActions from './ngrx/actions/auth.actions';
import * as UserActions from './ngrx/actions/user.actions';
import { User } from './models/user.model';
import { combineLatest } from 'rxjs';
import { UserState } from './ngrx/states/user.state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  idToken$ = this.store.select('auth', 'idToken');
  firebaseUser$ = this.store.select('auth', 'firebaseUser');
  isSuccess$ = this.store.select('auth', 'isLogoutSuccess');

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user.getIdToken(true);
        let newUser: User = {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          picture: user.photoURL || '',
          profile: '',
        };

        this.store.dispatch(AuthActions.storedIdToken(idToken));
        this.store.dispatch(AuthActions.storedFirebaseUser(newUser));
        this.router.navigate(['/loading']);
      } else {
        this.router.navigate(['/login']);
      }
    });

    combineLatest([this.idToken$, this.firebaseUser$]).subscribe(
      ([idToken, firebaseUser]) => {
        if (idToken && firebaseUser.uid) {
          this.store.dispatch(
            UserActions.get({ uid: firebaseUser.uid, idToken })
          );
        }
      }
    );

    this.isSuccess$.subscribe((isSuccess) => {
      if (isSuccess) {
        this.router.navigate(['/login']);
      }
    });
  }
}
