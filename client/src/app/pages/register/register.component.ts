import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from '../../ngrx/actions/user.actions';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as ProfileActions  from 'src/app/ngrx/actions/profile.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user$ = this.store.select('user','user');
  userLogin: User = <User>{}
  subscriptions: Subscription[] = [];
  isSuccessUser$ = this.store.select('user','isGetSuccess')
  isCreateProfileSeuccess$ = this.store.select('profile','isSuccess')
  profileForm!: FormGroup;
  userForm!: FormGroup;
  constructor(  private router: Router,     private auth: Auth, private store: Store<{ user: UserState, profile: ProfileState }> ){
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let user = getAuth().currentUser;
        console.log(user);
        this.userForm = new FormGroup({
          nam: new FormControl(`${user?.displayName}`, [Validators.required]),
          uid: new FormControl(`${user?.uid}`, [Validators.required]),
          picture: new FormControl(`${user?.photoURL}`, [Validators.required]),
        });
        this.store.dispatch(
          UserActions.getUser({uid: user!.uid})
        )
      }
      else{
        this.router.navigate(['/login'])
      }
    });
    this.subscriptions.push(
    this.user$.subscribe((user)=>{
      if(user){
        console.log(user)
        this.userLogin = user;
        console.log(this.userLogin);
        
      }
    }),
    this.isSuccessUser$.subscribe((isSuccessUser)=>{
      if(isSuccessUser){
        console.log(this.userLogin)
        // this.router.navigate([`/login`])
      }
    })


    );
    this.isCreateProfileSeuccess$.subscribe((isCreateSuccess)=>{
      if(isCreateSuccess){
        this.router.navigate([`/home`])
      }
    })

    this.profileForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  register(profileInput: Profile){
     const newProfile:Profile ={
      id:this.userLogin.uid,
      email:profileInput.email,
      displayName:this.userLogin.name,
      userName:profileInput.userName,
      bio:profileInput.bio,
      avatar:this.userLogin.picture,
      coverImg:"",
      followers:[],
      following:[],
      blocked:[],
      posts:[],
      messages:[],
      phone:profileInput.phone,
    }
    console.log(this.userForm.value);
    
    if((this.userLogin.uid)){
      this.store.dispatch(
        ProfileActions.createProfile({profile:newProfile,user: this.userForm.value})
    )
    }
    else{
      console.log('Register error');
      this.router.navigate(['/register'])
      
    }
    
  }


}
