import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
} from '@angular/core';

import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Store } from '@ngrx/store';
import { CommentState } from 'src/app/ngrx/states/comment.state';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { PostState } from 'src/app/ngrx/states/post.state';
import * as postActions from '../../ngrx/actions/post.actions';
import * as CommentActions from '../../ngrx/actions/comment.actions';
import * as AuthActions from '../../ngrx/actions/auth.actions';
import { Post } from 'src/app/models/post.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  commentsPost: Array<Comment> = [];
  comments$ = this.store.select('comment', 'comments');
  idToken$ = this.store.select('auth', 'idToken');
  idToken = '';
  post$ = this.store.select('post', 'posts');
  idpost: string = '';
  selectedPost: any;

  constructor(
    private router: Router,
    private store: Store<{
      comment: CommentState;
      auth: AuthState;
      post: PostState;
    }>
  ) {
    this.idToken$.subscribe((idToken) => {
      if (idToken) {
        this.idToken = idToken;
      }
    });
    this.comments$.subscribe((comments) => {
      console.log('comments', comments);
      if (comments.length) {
        this.commentsPost = comments;
        console.log('comments', this.commentsPost);
      }
    });
  }
  @Input() post!: [] | any;
  itemSelected: any;
  Selectitem(item: any) {
    this.itemSelected = item;
    console.log(item);
    this.router.navigate([`${item._id}/${item.id}/${item.authorId.userName}`]);
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
  openCommentDialog(item: Post) {
    this.selectedPost = item;
    console.log(this.selectedPost);

    this.store.dispatch(
      CommentActions.get({
        idToken: this.idToken,
        postId: this.selectedPost.id,
      })
    );

    console.log('idbaipostne', this.selectedPost.id);

    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
}
