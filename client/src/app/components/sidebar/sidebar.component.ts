import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import * as AuthActions from '../../ngrx/actions/auth.actions';
import * as StorageActions from '../../ngrx/actions/storage.actions';
import * as UserActions from '../../ngrx/actions/user.actions';
import * as ProfileActions from '../../ngrx/actions/profile.actions';
import * as PostActions from '../../ngrx/actions/post.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Store } from '@ngrx/store';
import { StorageState } from 'src/app/ngrx/states/storage.state';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserState } from 'src/app/ngrx/states/user.state';
import { Subscription, mergeMap } from 'rxjs';
import { ProfileState } from 'src/app/ngrx/states/profile.state';

import { Profile } from 'src/app/models/profile.model';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { PostState } from 'src/app/ngrx/states/post.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentPage?: string = '';
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  isCreateImgSuccess$ = this.store.select('storage', 'isCreateSuccess');
  idToken$ = this.store.select('auth', 'idToken');
  idToken: string = '';
  subscriptions: Subscription[] = [];
  isHaveFile: boolean = false;
  idPost: string = '';
  profile: Profile = <Profile>{};
  user$ = this.store.select('user', 'user');
  profile$ = this.store.select('profile', 'profile');
  storage$ = this.store.select('storage', 'storage');
  isCreatePostSuccess$ = this.store.select('post', 'isSuccess');
  selectedFile: any;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  postForm = new FormGroup({
    id: new FormControl(''),
    authorId: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    media: new FormControl<string[]>([]),
  });

  storageForm = new FormData();

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private store: Store<{
      auth: AuthState;
      storage: StorageState;
      user: UserState;
      profile: ProfileState;
      post: PostState;
    }>,
    private auth: Auth
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user!.getIdToken(true);
        this.idToken = idToken;
        this.store.dispatch(
          UserActions.get({ uid: user.uid, idToken: idToken })
        );
        console.log(user.uid, idToken);

        this.store.dispatch(
          ProfileActions.get({ id: user.uid, idToken: idToken })
        );

        // this.store.dispatch(AuthActions.storedIdToken(idToken));
      }
    });

    this.subscriptions.push(
      this.store
        .select('storage', 'isGetSuccess')
        .pipe(
          mergeMap((isGetSuccess) => {
            if (isGetSuccess) {
              return this.storage$;
            } else {
              return [];
            }
          })
        )
        .subscribe((storage) => {
          if (storage) {
            this.postForm.patchValue({
              media: storage.urls,
            });
            this.store.dispatch(
              PostActions.create({
                post: this.postForm.value,
                idToken: this.idToken,
              })
            );
          }
        }),
      this.isCreatePostSuccess$.subscribe((isCreatePostSuccess) => {
        if (isCreatePostSuccess) {
          this.closePostDialog();
        }
      }),

      this.storage$.subscribe((storage) => {
        if (storage) {
          this.postForm.patchValue({
            media: storage.urls,
          });
        }
      }),
      this.isCreateImgSuccess$.subscribe((isCreateSuccess) => {
        console.log('value of isCreateSuccess: ' + isCreateSuccess);
        if (isCreateSuccess) {
          console.log(this.idToken);

          this.store.dispatch(
            StorageActions.get({ id: this.idPost, idToken: this.idToken })
          );
        }
      }),
      this.idToken$.subscribe((value) => {
        this.idToken = value;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  posttest() {
    console.log(this.selectedFile);
    console.log(this.postForm.value);
  }

  post() {
    const id = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
    this.idPost = id;
    this.postForm.patchValue({
      id: id,
    });
    if (this.selectedFile) {
      this.store.dispatch(
        StorageActions.create({
          file: this.selectedFile,
          id: id,
          idToken: this.idToken,
        })
      );
    }
    // else{
    //   console.log(this.postForm.value);

    //   this.store.dispatch(PostActions.create({post: this.postForm.value, idToken: this.idToken}))
    // }
  }

  navItems = [
    { icon: 'home', text: 'Home', backgroundColor: false, route: '/home' },
    {
      icon: 'search',
      text: 'Search',
      backgroundColor: false,
      route: '/search',
    },
    { icon: 'notifications', text: 'Notifications', backgroundColor: false },
    { icon: 'chat', text: 'Message', backgroundColor: false, route: '/chat' },
    {
      icon: 'diversity_2',
      text: 'Group',
      backgroundColor: false,
      route: '/group/suggest',
    },
    {
      icon: 'account_circle',
      text: 'Profile',
      backgroundColor: false,
      route: `/profile/${this.profile.id}`,
    },
  ];

  ngOnInit(): void {
    const currentRoute = this.router.url;

    this.navItems.forEach((nav) => {
      if (nav.route == '/group/internal') {
      }

      if (nav.route === currentRoute) {
        nav.backgroundColor = true;
        console.log(nav.text, 'BackgroundColor set to true');
      } else {
        nav.backgroundColor = false;
      }
    });
  }

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }

  changeBackgroundColor(selectedNav: any) {
    if (selectedNav.backgroundColor) {
      return;
    }

    this.navItems.forEach((nav) => {
      if (nav == selectedNav) {
        nav.backgroundColor = true;
        this.currentPage = nav.route;
      } else {
        nav.backgroundColor = false;
        // Đặt lại màu nền cho biểu tượng cũ
      }
    });

    this.router.navigate([selectedNav.route]);
  }

  return(icon: string) {
    this.router.navigate(['/home']);

    this.navItems.forEach((nav) => {
      nav.backgroundColor = nav.icon === icon;
    });
  }
  openPostDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closePostDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
