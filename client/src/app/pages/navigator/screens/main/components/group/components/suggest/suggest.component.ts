import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupState } from 'src/app/ngrx/states/group.state';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';
import { Observable, Subscription, combineLatest, mergeMap } from 'rxjs';
import * as GroupActions from 'src/app/ngrx/actions/group.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserState } from 'src/app/ngrx/states/user.state';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnDestroy, OnInit {
  isJoinSuccess$ = this.store.select('group', 'isSuccess');
  errorMessage$ = this.store.select('group', 'errorMessage');

  groups: Group = <Group>{};
  groups$: Observable<Group> = this.store.select('group', 'group');
  isGetSuccess$ = this.store.select('group', 'isGetSuccess');
  isCreating$ = this.store.select('group', 'isLoading');
  isCreateSuccess$ = this.store.select('group', 'isSuccess');

  groupsList: Group[] = [];
  groupsList$: Observable<Group[]> = this.store.select('group', 'groupList');

  groupJoined: Group[] = [];
  groupJoined$: Observable<Group[]> = this.store.select('group', 'groupJoined');
  isGetJoinedSuccess$ = this.store.select('group', 'isGetJoinedSuccess');

  user$ = this.store.select('user', 'user');

  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');

  idToken: string = '';
  idToken$ = this.store.select('auth', 'idToken');

  userFirebase$ = this.store.select('auth', 'firebaseUser');

  avatarUrl: string = '';
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

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private location: Location,
    private store: Store<{
      group: GroupState;
      user: UserState;
      auth: AuthState;
      profile: ProfileState;
    }>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.idToken$, this.profile$]).subscribe(
        ([idToken, profile]) => {
          this.idToken = idToken;
          this.profile = profile;
          this.groupForm = new FormGroup({
            name: new FormControl('', Validators.required),
            owner: new FormControl(profile._id),
            members: new FormControl<string[]>([profile._id]),
            posts: new FormControl<string[]>([]),
          });
          if (this.idToken && this.profile._id) {
            this.store.dispatch(
              GroupActions.getAll({ idToken: this.idToken, uid: profile._id })
            );
            this.store.dispatch(
              GroupActions.getJoined({
                uid: profile._id,
                idToken: this.idToken,
              })
            );
          }
        }
      ),
      this.isGetSuccess$
        .pipe(
          mergeMap((res) => {
            if (res) {
              return this.groupsList$;
            } else {
              return [];
            }
          })
        )
        .subscribe((data) => {
          if (data) {
            this.groupsList = data;
            console.log(data);
          }
        }),
      this.isGetJoinedSuccess$
        .pipe(
          mergeMap((res) => {
            if (res) {
              return this.groupJoined$;
            } else {
              return [];
            }
          })
        )
        .subscribe((data) => {
          if (data) {
            this.groupJoined = data;
            console.log(this.groupJoined);
          }
        }),
      this.isCreating$.subscribe((res) => {
        if (res) {
          this.openSnackBar('Creating group...');
        }
      }),
      this.isCreateSuccess$.subscribe((res) => {
        if (res) {
          this.dialog.nativeElement.close();
          this.groupForm.reset();
          this.openSnackBar('Create group successfully!');
          this.store.dispatch(
            GroupActions.getAll({
              idToken: this.idToken,
              uid: this.profile._id,
            })
          );
        }
      }),
      this.errorMessage$.subscribe((res) => {
        if (res) {
          this.dialog.nativeElement.close();
          this.groupForm.reset();
          this.openSnackBar(`Error: ${res.error.message}`);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  createGroup() {
    this.store.dispatch(
      GroupActions.create({
        group: this.groupForm.value,
        idToken: this.idToken,
      })
    );
  }
  // joined = false;

  // join() {
  //   if(this.profile._id.includes(this.groups._id)) {
  //     this.joined = true;
  //   } else {
  //     this.joined = false;
  //   }
  // }

  joinGroup() {}

  getDetail() {}

  back() {
    this.location.back();
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

  openSnackBar(message: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
