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
import { Observable, Subscription, combineLatest, mergeMap } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { Profile } from 'src/app/models/profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as GroupActions from 'src/app/ngrx/actions/group.actions';


@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
})
export class InternalComponent implements OnInit, OnDestroy {

  errorMessage$ = this.store.select('group', 'errorMessage');

  groups: Group = <Group>{};
  groups$: Observable<Group> = this.store.select('group', 'group');
  isGetSuccess$ = this.store.select('group', 'isGetSuccess');

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

  userFirebase: any = null;
  constructor(
    private location: Location,
    private store: Store<{
      group: GroupState;
      user: UserState;
      auth: AuthState;
      profile: ProfileState;
      
    }>,
    private _snackBar: MatSnackBar,
    
  ) {
    this.subscriptions.push(
      // combineLatest([this.idToken$, this.profile$]).subscribe(
      //   ([idToken, profile]) => {
      //     this.idToken = idToken;
      //     this.profile = profile;
      //     this.name = this.groups.name;
      //     this.owner = this.groups.owner;
      //     this.members = this.groups.members;
          

      //     if(this.idToken && this.profile) {
      //       this.store.dispatch(GroupActions.getOne({ id: this.groups._id, idToken: this.idToken }));
      //     }
      //   }
      // ),
      // this.isGetSuccess$
      //   .pipe(
      //     mergeMap((isGetSuccess) => {
      //       if (isGetSuccess) {
      //         return this.groups$;
      //       } else {
      //         return [];
      //       }
      //     })
      //   )
      //   .subscribe((groups) => {
      //     if(groups) {
      //       this.groups = groups;
      //     }
      //   }),
      //   this.isGetSuccess$.subscribe((isGetSuccess) => {
      //     if (isGetSuccess) {
      //       this.openSnackBar('Get group successfully');
      //     }
      //   }),
        
      

    );

      
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

  openSnackBar(message: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
