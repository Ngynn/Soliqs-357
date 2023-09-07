import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, mergeMap } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';

import { PostState } from 'src/app/ngrx/states/post.state';
import * as PostActions from 'src/app/ngrx/actions/post.actions';

import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  idToken: string = '';
  idToken$ = this.store.select('auth', 'idToken');

  subscriptions: Subscription[] = [];

  posts: Post[] = [];
  posts$ = this.store.select('post', 'posts');
  isGetSuccess$ = this.store.select('post', 'isGetSuccess');

  page: number = 0;

  throttle = 500;
  scrollDistance = 1;
  scrollUpDistance = 2;

  onScrollDown(ev: any) {
    // console.log('scrolled down!!', ev);
    this.page += 1;
    this.store.dispatch(
      PostActions.get({ idToken: this.idToken, page: this.page, pageSize: 2 })
    );
  }

  constructor(
    private store: Store<{
      auth: AuthState;
      post: PostState;
    }>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.idToken$.subscribe((idToken) => {
        if (idToken) {
          this.idToken = idToken;
          this.store.dispatch(
            PostActions.get({ idToken: idToken, page: this.page, pageSize: 2 })
          );
        }
      }),
      this.isGetSuccess$
        .pipe(
          mergeMap((res) => {
            if (res) {
              return this.posts$;
            } else {
              return [];
            }
          })
        )
        .subscribe((data) => {
          this.posts = data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  // posts = [
  //   {
  //     id: 1,
  //     uid: 1,
  //     avatarUrl:
  //       'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png',
  //     username: 'Nguyễn Minh Mập',
  //     tagname: '@MậpMủmMỉm',
  //     time: '15 tháng 8',
  //     content: 'hình ảnh phong cảnh ',
  //     imageUrls: [
  //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     ],

  //     commentCount: '13k',
  //     repostCount: '11k',
  //     likeCount: '14k',
  //     monitoringCount: '200k',
  //   },
  //   {
  //     id: 2,
  //     uid: 2,
  //     avatarUrl:
  //       'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //     username: 'Trần Thành Huy',
  //     tagname: '@HuyHuyHuy',
  //     time: '15 tháng 8',
  //     content: 'hình ảnh nhân vật ',
  //     imageUrls: [
  //       'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     ],

  //     commentCount: '12k',
  //     repostCount: '13k',
  //     likeCount: '15k',
  //     monitoringCount: '200k',
  //   },
  //   {
  //     id: 3,
  //     uid: 3,
  //     avatarUrl:
  //       'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1692779137~exp=1692779737~hmac=3cc3a2ec042e6477875c549361ec7360c2f89645580f9510231302152fa2e4e1',
  //     username: 'Phùng Minh Khoa',
  //     tagname: '@KhoaKhoaKhoa',
  //     time: '15 tháng 8',
  //     content: 'hình ảnh của chó cỏ ',
  //     imageUrls: [
  //       'https://images.pexels.com/photos/2734469/pexels-photo-2734469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //       'https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //       'https://images.pexels.com/photos/2734469/pexels-photo-2734469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     ],
  //     commentCount: 120,
  //     repostCount: 3,
  //     likeCount: 1,
  //     monitoringCount: 20,
  //   },
  // ];

  // listImg: string[] = [
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjoGr1Xb3hX9FcOZWi8b07rG9MpxsyEHwaGQ&usqp=CAU',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  //   'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  // ];

  showRemaining: boolean = false;
  showMoreImages() {
    this.showRemaining = true;
  }

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

  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
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
}
