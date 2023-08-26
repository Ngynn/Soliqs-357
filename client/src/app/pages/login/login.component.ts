import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, idToken, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthService } from 'src/app/services/auth/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as AuthActions from '../../ngrx/actions/auth.actions';
import * as UserActions from '../../ngrx/actions/user.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  idToken$ = this.store.select('auth', 'idToken');
  isSuccessful$ = this.store.select('auth', 'isSuccessful');
  errorMessage$ = this.store.select('user', 'errorMessage');
  uid: string = '';
  isToken: string = '';
  subscriptions: Subscription[] = [];
  user$ = this.store.select('user', 'user');
  isGetUserSuccess$ = this.store.select('user', 'isGetSuccess');
  isCreateUserSuccess$ = this.store.select('user','isLoading')
  user: User = <User>{}

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let user = getAuth().currentUser;
        this.uid = user!.uid;
        let idToken = await user!.getIdToken(true);
        this.store.dispatch(AuthActions.storedIdToken(idToken));
        this.store.dispatch(UserActions.getUser({ uid: user!.uid }));
        console.log(this.uid)
        
      }
    });

    this.subscriptions.push(
      this.idToken$.subscribe((token) => {
        if (token) {
          console.log(token);
          this.isToken = token;
        }
      }),
      this.user$.subscribe((user) => {
          if(user){
            this.user = user;
          }
      }),
      this.isGetUserSuccess$.subscribe((isGetUserSuccess) => {
        if (isGetUserSuccess) {
          if (this.user.uid) {
            console.log(this.user);
            console.log(isGetUserSuccess)
            if (this.user.profile) {
              this.router.navigate(['/home']);
            }
            else{
              this.router.navigate(['/register'])
            }
            
          }
          else {
            this.store.dispatch(UserActions.createUser({idToken: this.isToken}))
        }
        }
      }),
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          this.openSnackBar(errorMessage);
          // console.log(errorMessage);
        }
      })
    );
    this.isSuccessful$.subscribe((isSuccessful) => {
      // if(isSuccessful){
      //   if(!this.user.uid){
      //     console.log(this.isToken);
      //     this.store.dispatch(UserActions.createUser({idToken: this.isToken}))
      //   }
      //   else{
      //     this.router.navigate(['/home'])
      //   }
      // }
    })
    this.isCreateUserSuccess$.subscribe((isCreateUserSuccess)=>{
      if(isCreateUserSuccess){
        this.router.navigate([`/register`])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void { }

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
