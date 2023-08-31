import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Auth, idToken, onAuthStateChanged } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as AuthActions from '../../../../../../ngrx/actions/auth.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import * as ProfileActions from '../../../../../../ngrx/actions/profile.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
    private auth: Auth
  ) {
    this.profile$.subscribe((value) => {
      if (value) {
        this.profile = value;
        console.log('profile', value);
      }
    });

    onAuthStateChanged(this.auth, async (profile) => {
      if (profile) {
        let idToken = await profile!.getIdToken(true);
        this.isToken = idToken;
        this.store.dispatch(
          ProfileActions.get({ id: profile.uid, idToken: idToken })
        );
        console.log('profile', profile);
      } else {
        console.log('no user', profile);
      }
    });
  }
  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');
  isToken: string = '';
  myEditForm = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
  posts = [
    {
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png',
      username: 'Nguyễn Minh Mập2',
      tagname: '@MậpMủmMỉm',
      time: '15 tháng 8',
      content: 'Hình ảnh sếp Lu Lu khi thấy chúng tôi làm cho sếp bất ngờ',
      imageUrls: [
        'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],

      commentCount: '13k',
      repostCount: '11k',
      likeCount: '14k',
      monitoringCount: '200k',
    },
    {
      avatarUrl:
        'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
      username: 'Trần Thành Huy2',
      tagname: '@HuyHuyHuy',
      time: '15 tháng 8',
      content: 'hình ảnh nhân vật ',
      imageUrls: [
        'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],

      commentCount: '12k',
      repostCount: '13k',
      likeCount: '15k',
      monitoringCount: '200k',
    },
    {
      avatarUrl:
        'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1692779137~exp=1692779737~hmac=3cc3a2ec042e6477875c549361ec7360c2f89645580f9510231302152fa2e4e1',
      username: 'Phùng Minh Khoa2',
      tagname: '@KhoaKhoaKhoa',
      time: '15 tháng 8',
      content: 'hình ảnh của chó cỏ ',
      imageUrls: [
        'https://images.pexels.com/photos/2734469/pexels-photo-2734469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      commentCount: 120,
      repostCount: 3,
      likeCount: 1,
      monitoringCount: 20,
    },
  ];
  item1 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item2 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item3 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item4 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  showImageInput = false;
  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  @ViewChild('appDialog3', { static: true })
  dialog3!: ElementRef<HTMLDialogElement>;
  cdr3 = inject(ChangeDetectorRef);

  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }

  repost1() {
    if (!this.item1.sync) {
      this.item1.sync = true;
    } else {
      this.item1.sync = false;
    }
  }
  repost2() {
    if (!this.item2.sync) {
      this.item2.sync = true;
    } else {
      this.item2.sync = false;
    }
  }
  repost3() {
    if (!this.item3.sync) {
      this.item3.sync = true;
    } else {
      this.item3.sync = false;
    }
  }
  repost4() {
    if (!this.item4.sync) {
      this.item4.sync = true;
    } else {
      this.item4.sync = false;
    }
  }
  like1() {
    if (!this.item1.favorite) {
      this.item1.favorite = true;
    } else {
      this.item1.favorite = false;
    }
  }
  like2() {
    if (!this.item2.favorite) {
      this.item2.favorite = true;
    } else {
      this.item2.favorite = false;
    }
  }
  like3() {
    if (!this.item3.favorite) {
      this.item3.favorite = true;
    } else {
      this.item3.favorite = false;
    }
  }
  like4() {
    if (!this.item4.favorite) {
      this.item4.favorite = true;
    } else {
      this.item4.favorite = false;
    }
  }
  monitoring1() {
    if (!this.item1.monitoring) {
      this.item1.monitoring = true;
    } else {
      this.item1.monitoring = false;
    }
  }
  monitoring2() {
    if (!this.item2.monitoring) {
      this.item2.monitoring = true;
    } else {
      this.item2.monitoring = false;
    }
  }
  monitoring3() {
    if (!this.item3.monitoring) {
      this.item3.monitoring = true;
    } else {
      this.item3.monitoring = false;
    }
  }
  monitoring4() {
    if (!this.item4.monitoring) {
      this.item4.monitoring = true;
    } else {
      this.item4.monitoring = false;
    }
  }
  @ViewChild('appDialogDetailPost', { static: true })
  dialogDetailPost!: ElementRef<HTMLDialogElement>;
  cdrDetailPost = inject(ChangeDetectorRef);
  openDetailDialog() {
    this.dialogDetailPost.nativeElement.showModal();
    this.cdrDetailPost.detectChanges();
  }
  closeDetailDialog() {
    this.dialogDetailPost.nativeElement.close();
    this.cdrDetailPost.detectChanges();
  }
  openEditProfileDialog() {
    this.dialog3.nativeElement.showModal();
    this.cdr3.detectChanges();
  }
  closeEditProfileDialog() {
    this.dialog3.nativeElement.close();
    this.cdr3.detectChanges();
  }
  save() {}
}
