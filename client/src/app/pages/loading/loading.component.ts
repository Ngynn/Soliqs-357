import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserState } from 'src/app/ngrx/states/user.state';

import * as UserActions from '../../ngrx/actions/user.actions';
import { Subscription, mergeMap } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 200;

  subscriptions: Subscription[] = [];

  userData$ = this.store.select('user', 'user');

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    setTimeout(() => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          console.log('user', user);
          let idToken = await user!.getIdToken(true);
          console.log(idToken)
          this.store.dispatch(UserActions.getUser({ uid: user.uid, idToken:idToken }));
        } else {
          this.router.navigate(['/login']);
          console.log('no user', user);

        }
      });

      this.subscriptions.push(
        this.store
          .select('user', 'isGetSuccess')
          .pipe(
            mergeMap((isGetSuccess) => {
              if (isGetSuccess) {
                console.log('isGetSuccess', isGetSuccess);
                return this.userData$;
                
              } else {
                return [];
              }
            })
          )
          .subscribe((user) => {
            if (user) {
              console.log('user data', user);
              if (user.profile === null) {
                console.log('register');
                
                this.router.navigate(['/register']);
              } else if (user.profile) {
                console.log('home');
                this.router.navigate(['/home']);
              }
            } else {
              console.log('login');
              this.router.navigate(['/login']);
            }
          })
      );
    }, 2000);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
}
