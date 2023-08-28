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
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let user = getAuth().currentUser;
        console.log(user!.uid);
        this.store.dispatch(UserActions.getUser({ uid: user!.uid }));
      } else {
        // this.router.navigate(['/loading']);
      }
    });
    this.subscriptions
      .push
      // this.user$.subscribe((user)=>{
      //   if(user){
      //     this.userLogin = user;
      //   }
      // }),
      // this.isGetUserSuccess$.subscribe((isGetUserSuccess)=>{
      //   console.log(isGetUserSuccess)
      //   if(isGetUserSuccess){
      //     if(this.userLogin.uid)
      //     {
      //       if(!this.userLogin.profile){
      //         console.log(this.userLogin.profile);

      //         // this.router.navigate([`/register`])
      //       }
      //     }
      //     else{
      //       this.router.navigate([`/login`])
      //     }

      //     // this.router.navigate([`/login`])
      //   }
      // })
      ();
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
