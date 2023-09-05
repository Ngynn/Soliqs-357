import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as ProfileActions from 'src/app/ngrx/actions/profile.actions';

import { UserState } from 'src/app/ngrx/states/user.state';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar,
    private store: Store<{ user: UserState; profile: ProfileState }>
  ) {}

  ngOnInit(): void {
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
      }),
      this.store.select('profile', 'isLoading').subscribe((res) => {
        if (res) {
          this.openSnackBar('Creating user...');
        }
      }),
      this.store.select('profile', 'isSuccess').subscribe((res) => {
        if (res) {
          this.openSnackBar('Register successfully!');
          this.router.navigate(['/loading']);
        }
      }),
      this.store.select('profile', 'errorMessage').subscribe((res) => {
        if (res) {
          this.openErrorSnackBar(`Error: ${res}`);
        }
      })
    );
  }

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

  openSnackBar(message: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }

  openErrorSnackBar(message: any) {
    this._snackBar.open(message.error.message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
