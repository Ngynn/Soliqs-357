import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { AuthState } from 'src/app/ngrx/states/auth.state';

import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

import { Post } from 'src/app/models/post.model';
import * as PostActions from '../../ngrx/actions/post.actions';
import { PostState } from 'src/app/ngrx/states/post.state';

import { CommentState } from 'src/app/ngrx/states/comment.state';
import * as CommentActions from '../../ngrx/actions/comment.actions';
import { Comment } from 'src/app/models/comment.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { Profile } from 'src/app/models/profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  profile$ = this.store.select('profile', 'profile');
  profile!: Profile;

  postId!: string | null;
  post$ = this.store.select('post', 'post');
  post!: Post;

  subscriptions: Subscription[] = [];

  idToken$ = this.store.select('auth', 'idToken');
  idToken: string = '';

  comments: Array<Comment> = [];
  comments$ = this.store.select('comment', 'comments');
  isCommentSuccess$ = this.store.select('comment', 'isCreateSuccess');

  commentForm = new FormGroup({
    content: new FormControl('', Validators.required),
    authorId: new FormControl(''),
    postId: new FormControl(''),
  });

  commentData = {
    authorId: '',
    content: this.commentForm.value.content || '',
    postId: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<{
      auth: AuthState;
      post: PostState;
      comment: CommentState;
      profile: ProfileState;
    }>
  ) {
    this.post$.subscribe((post) => {
      if (post._id) {
        this.post = post;
      }
    }),
      this.comments$.subscribe((comments) => {
        if (comments.length) {
          console.log(comments);

          this.comments = comments;
        }
      });
    this.isCommentSuccess$.subscribe((isSuccess) => {
      this.route.queryParamMap.subscribe((params) => {
        this.postId = params.get('id');
      });
      if (isSuccess) {
        this.commentForm.reset();
        this.commentData = {
          authorId: '',
          content: this.commentForm.value.content || '',
          postId: '',
        };
        this.comments = [];
        this.store.dispatch(
          CommentActions.get({ postId: this.postId!, idToken: this.idToken })
        );
      }
    });
  }
  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.idToken$, this.profile$]).subscribe(
        ([idToken, profile$]) => {
          this.profile = profile$;
          this.idToken = idToken;
          console.log(idToken);
        }
      )
    );
    this.route.queryParamMap.subscribe((params) => {
      this.postId = params.get('id');
      if (this.postId) {
        this.comments = [];
        this.store.dispatch(
          PostActions.getById({ idToken: this.idToken, id: this.postId })
        );
        this.store.dispatch(
          CommentActions.get({ postId: this.postId, idToken: this.idToken })
        );
      }
    });
  }
  postComment() {
    this.commentData = {
      authorId: this.profile._id,
      content: this.commentForm.value.content || '',
      postId: this.post._id,
    };
    this.store.dispatch(
      CommentActions.create({
        idToken: this.idToken,
        postId: this.post._id,
        comment: this.commentData,
      })
    );
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

  handleImageUpload(event: any) {
    const file = event.target.files[0]; // Lấy file hình ảnh từ sự kiện

    // Thực hiện các xử lý liên quan đến tệp hình ảnh tại đây

    // Sau khi hoàn thành xử lý, bạn có thể ẩn input file bằng cách đặt lại biến showImageInput về false
    this.showImageInput = false;
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
  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
  return() {
    // Chuyển hướng đến trang home
    // this.location.back();
    this.store.dispatch(PostActions.clearAllState());
    this.store.dispatch(CommentActions.clearAllState());
    this.router.navigate(['/home']);
    this.comments = [];

    // Đặt màu nền của biểu tượng tương ứng thành true và của các biểu tượng khác thành false
  }
}
