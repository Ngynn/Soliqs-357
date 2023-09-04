import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as UserActions from '../../ngrx/actions/user.actions';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/ngrx/states/user.state';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit, OnDestroy {
  user$ = this.store.select('user', 'user');
  userLogin: User = <User>{};
  subscriptions: Subscription[] = [];
  isGetUserSuccess$ = this.store.select('user', 'isGetSuccess');
  isCreateProfileSeuccess$ = this.store.select('profile', 'isSuccess');

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ user: UserState; profile: ProfileState }>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
