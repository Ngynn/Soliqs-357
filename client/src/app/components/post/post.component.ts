import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Store } from '@ngrx/store';
import { CommentState } from 'src/app/ngrx/states/comment.state';

import { AuthState } from 'src/app/ngrx/states/auth.state';
import { PostState } from 'src/app/ngrx/states/post.state';

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
    console.log(this.itemSelected);
    this.router.navigate(['/photo'], {
      queryParams: {
        id: item._id,
      },
      queryParamsHandling: 'merge',
    });
  }

  item1 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };

  showImageInput = false;
  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    this.showImageInput = false;
  }

  repost1() {
    if (!this.item1.sync) {
      this.item1.sync = true;
    } else {
      this.item1.sync = false;
    }
  }
  like1() {
    if (!this.item1.favorite) {
      this.item1.favorite = true;
    } else {
      this.item1.favorite = false;
    }
  }

  monitoring1() {
    if (!this.item1.monitoring) {
      this.item1.monitoring = true;
    } else {
      this.item1.monitoring = false;
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
}
