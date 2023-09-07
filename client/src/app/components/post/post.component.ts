import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Store } from '@ngrx/store';
import { CommentState } from 'src/app/ngrx/states/comment.state';
import * as CommentActions from '../../ngrx/actions//comment.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { PostState } from 'src/app/ngrx/states/post.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import * as ProfileActions from '../../ngrx/actions/profile.actions';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  commentsPost: Array<Comment> = [];
  comments$ = this.store.select('comment', 'comments');
  idToken$ = this.store.select('auth', 'idToken');
  profile$ = this.store.select('profile', 'profile');
  profile: Profile = <Profile>{};
  idToken = '';
  post$ = this.store.select('post', 'posts');
  idpost: string = '';
  selectedPost: any;
  authorId: string = '';
  constructor(
    private router: Router,
    private store: Store<{
      comment: CommentState;
      auth: AuthState;
      post: PostState;
      profile: ProfileState;
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
    this.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
      }
    });
  }
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
  postComment() {
    this.store.dispatch(
      CommentActions.create({
        idToken: this.idToken,
        postId: this.selectedPost._id,
        comment: this.commentData,
      })
    );
    console.log('====================================');
    console.log('commentData', this.commentData);
    console.log('====================================');
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

  openCommentDialog(item: any) {
    this.selectedPost = item;
    this.authorId = item.authorId._id;
    this.store.dispatch(
      CommentActions.get({
        idToken: this.idToken,
        postId: item._id,
      })
    );
    console.log('_id', item._id);
    this.commentData = {
      authorId: this.authorId,
      content: this.commentForm.value.content || '',
      postId: item.id,
    };
    console.log('authorId', this.authorId);
    console.log('baipostne', item);

    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
}
