import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupState } from 'src/app/ngrx/states/group.state';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';
import { Observable, Subscription, mergeMap } from 'rxjs';
import * as GroupAction from 'src/app/ngrx/actions/group.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { UserState } from 'src/app/ngrx/states/user.state';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as UserAction from 'src/app/ngrx/actions/user.actions'; 
import * as ProfileAction from 'src/app/ngrx/actions/profile.actions';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnDestroy, OnInit {
  isGetSuccess$ = this.store.select('group', 'isGetSuccess');
  isCreateGroupSuccess$ = this.store.select('group', 'isSuccess');
  errorMessage$ = this.store.select('group', 'errorMessage');
  groups: Group[] = []; 

  groups$:  Observable<Group[]> = this.store.select('group', 'groups');



  user$ = this.store.select('user', 'user');

  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');

  


  idToken$ = this.store.select('auth', 'idToken');
  idToken: string = '';

  

  uid: string = '';
  subscriptions: Subscription[] = [];


  name: string = '';
  owner: string = '';
  members: string[] = [];
  posts: string[] = [];


  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    owner: new FormControl(''),
    members: new FormControl<string[]>([]),
    posts: new FormControl<string[]>([]),
  });

  

  user: User = <User>{};
  userFirebase: any = null;


  constructor(private router: Router, private location: Location,private auth:Auth, private store: Store<{group: GroupState; user:UserState; auth: AuthState; profile: ProfileState}>) {
    onAuthStateChanged(this.auth, async (user) => {
      console.log(user + 'User firebase');
      if (user) {
        let idToken = await user.getIdToken(true);
        this.idToken = idToken;
        this.store.dispatch(UserAction.getUser({uid: user.uid, idToken: idToken}));
        this.store.dispatch(ProfileAction.get({id: user.uid, idToken: idToken}));
        this.groupForm.patchValue({
          owner: user!.uid,

        });
      }
    });
    this.profile$.subscribe((value) => {
      if (value) {
        this.profile = value;
        this.groupForm.patchValue({owner: value.id});
      }
    });
    this.subscriptions.push(
      this.store
      .select('user', 'isGetSuccess')
      .pipe(
        mergeMap((isGetSuccess)=>{
          if(isGetSuccess){
            return this.user$
          }
          else{
            return []
          }
        })
      )
      .subscribe((user) => {
        if (user) {
        this.store.dispatch(ProfileAction.get({id: user.uid, idToken: this.idToken}));
        }
      }),
      this.store
      .select('profile','isSuccess')
      .pipe(
        mergeMap((isSuccess)=>{
          if(isSuccess){
            return this.profile$
          }
          else{
            return []
          }
        })
      )
      .subscribe((profile)=>{
        if(profile)
        {
          
          this.groupForm.patchValue({
            owner: profile.id,
          })
        }
      }),
      this.isCreateGroupSuccess$.subscribe((isSuccess) => {
        console.log('value of createSuccess' + isSuccess);
        if (isSuccess) {
          console.log(this.idToken);
          this.store.dispatch(GroupAction.get({name:''}));
        }
      }),
      
    );

    this.idToken$.subscribe((value) => {
      this.idToken = value;
    });
    
    
          
    
    this.store.dispatch(GroupAction.get({name:''}));
    
    this.groups$.subscribe((groups) => {
      this.groups = groups;
      console.log(groups);
    });
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  createGroup( ) {
    console.log(this.groupForm.value);
    this.store.dispatch(GroupAction.create({group: <Group>this.groupForm.value}));
    this.closeDialog();
  }

  

  goToInternal() {
    this.router.navigate(['/group/internal']);
  }
  back() {
    this.location.back();
  }
  buttonText: string = 'Join';

  joined: boolean = false;

  join(): void {
    this.joined = true;
  }

  @ViewChild('createGroupDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  } 

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }


  
}
