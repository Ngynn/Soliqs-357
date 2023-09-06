import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { GroupState } from 'src/app/ngrx/states/group.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { Observable, Subscription, mergeMap } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { Profile } from 'src/app/models/profile.model';
import { User } from '@angular/fire/auth';
import * as GroupAction from 'src/app/ngrx/actions/group.actions';
import * as UserAction from 'src/app/ngrx/actions/user.actions';
import * as ProfileAction from 'src/app/ngrx/actions/profile.actions';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
})
export class InternalComponent implements OnInit, OnDestroy {
  isCreateGroupSuccess$ = this.store.select('group', 'isSuccess');

  isGetDetailSuccess$ = this.store.select('group', 'isGetLoading');
  errorMessage$ = this.store.select('group', 'errorMessage');

  groups: Group = <Group>{};
  groups$: Observable<Group> = this.store.select('group', 'group');

  groupsList: Group[] = [];

  groupsList$: Observable<Group[]> = this.store.select('group', 'groupList');


  user$ = this.store.select('user', 'user');
  user: User = <User>{};


  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');

  idToken$ = this.store.select('auth', 'idToken');
  idToken: string = '';

  userFirebase$ = this.store.select('auth', 'firebaseUser');

  uid: string = '';
  subscriptions: Subscription[] = [];

  name: string = '';
  owner: string = '';
  members: string[] = [];
  posts: string[] = [];
  id: string = '';



  userFirebase: any = null;
  constructor(private location: Location, private store: Store<{
    group: GroupState;
    user: UserState;
    auth: AuthState;
    profile: ProfileState;
  }>) {
    this.idToken$.subscribe((idToken) => {
      this.idToken = idToken;
    });
    this.userFirebase$.subscribe((userFirebase) => {
      if(userFirebase) {
        this.store.dispatch(UserAction.get({ uid: userFirebase.uid, idToken: this.idToken }));
        this.store.dispatch(ProfileAction.get({ id: userFirebase.uid, idToken: this.idToken }));

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
          if (user) {
            this.store.dispatch(
              ProfileAction.get({ id: user.uid, idToken: this.idToken })
              
            );
            console.log(user);

          }
        }),
    );
    

    this.groups$.subscribe((group) => {
      this.groups = group;
    });
    
    this.store.dispatch(GroupAction.getDetail({ id: this.id, idToken: this.idToken }));
    
    
    
    
  }

  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  joined: boolean = false;
  
  showImageInput = false;
  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  handleImageUpload(event: any) {
    const file = event.target.files[0]; // Lấy file hình ảnh từ sự kiện

    // Thực hiện các xử lý liên quan đến tệp hình ảnh tại đây

    // Sau khi hoàn thành xử lý, bạn có thể ẩn input file bằng cách đặt lại biến showImageInput về false
    this.showImageInput = false;
  }

  join(): void {
    this.joined = true;
  }
 
  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
  back() {
    this.location.back();
  }
}
