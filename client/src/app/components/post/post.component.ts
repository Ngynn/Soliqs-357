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
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { PostState } from 'src/app/ngrx/states/post.state';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { StorageState } from 'src/app/ngrx/states/storage.state';
import * as PostActions from '../../ngrx/actions/post.actions';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  throttle = 500;
  scrollDistance = 1;
  scrollUpDistance = 2;
  page = 1;

  posts: Array<Post> = [];
  posts$!: Observable<PostState>;

  idToken: string = '';
  idToken$ = this.store.select('auth', 'idToken');

  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');

  subscriptions: Subscription[] = [];
  onScrollDown(ev: any) {
    this.page += 1;
    this.store.dispatch(
      PostActions.get({ idToken: this.idToken, page: this.page, pageSize: 2 })
    );
  }

  constructor(private router: Router,
    private store: Store<{
      auth: AuthState;
      storage: StorageState;
      profile: ProfileState;
      post: PostState;
    }>
  ) {




  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.idToken$, this.profile$]).subscribe(
        ([idToken, profile]) => {
          this.profile = profile;
          this.idToken = idToken;
          console.log(idToken);
          
        }
      ),
    )
    this.store.dispatch(PostActions.get({ idToken: this.idToken, page: 0, pageSize: 2 }))
    
    // this.posts$.subscribe((res) => {
    //   if (res.isSuccess) {
    //     if (res.posts === undefined || !res.posts) return;
    //     res.posts.map((post) => {
    //       this.posts.push(post);
    //     });
    //   }
    // });
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
      queryParamsHandling: 'merge'
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
