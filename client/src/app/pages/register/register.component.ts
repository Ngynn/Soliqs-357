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
  avatar: string = '';

  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  regisData = {
    id: '',
    email: '',
    displayName: '',
    userName: '',
    avatar: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ user: UserState; profile: ProfileState }>
  ) {
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        if (user.uid) {
          this.regisForm.patchValue({
            id: user.uid,
            email: user.email,
            displayName: user.name,
            avatar: user.picture,
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
      avatar: this.regisForm.value.avatar ?? '',
    };

    this.store.dispatch(
      ProfileActions.create({
        profile: <Profile>this.regisData,
      })
    );
  }
}
