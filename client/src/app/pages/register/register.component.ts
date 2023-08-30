import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from '../../ngrx/actions/user.actions';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as ProfileActions from 'src/app/ngrx/actions/profile.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Subscription, mergeMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  user$ = this.store.select('user', 'user');
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');

  isCreateSuccess$ = this.store.select('profile', 'isSuccess');
  errorMessage$ = this.store.select('profile', 'errorMessage');

  subscriptions: Subscription[] = [];

  id: string = '';
  email: string = '';
  displayName: string = '';

  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
  });

  regisData = {
    id: '',
    email: '',
    displayName: '',
    userName: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ user: UserState; profile: ProfileState }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('user', user.uid);
        let idToken = await user!.getIdToken(true);
        this.regisForm.patchValue({
          id: user!.uid,
          email: user!.email,
          displayName: user!.displayName!,
        });
        this.store.dispatch(UserActions.getUser({ uid: user.uid, idToken: idToken }));
      } else {
        this.router.navigate(['/loading']);
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
          if (user.profile) {
            this.router.navigate(['/loading']);
          }
        }),

      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess) {
          this.router.navigate(['/home']);
        }
      }),
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          this.regisForm.patchValue({
            userName: '',
          });
        }
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  register() {
    this.regisData = {
      id: this.regisForm.value.id ?? '',
      email: this.regisForm.value.email ?? '',
      userName: this.regisForm.value.userName ?? '',
      displayName: this.regisForm.value.displayName ?? '',
    };

    this.store.dispatch(
      ProfileActions.create({
        profile: <Profile>this.regisData,
      })
    );
  }
}
