import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import * as AuthActions from '../../ngrx/actions/auth.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Store } from '@ngrx/store';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { ProfileService } from 'src/app/services/profile/profile.service';
import * as ProfileActions from '../../ngrx/actions/profile.actions';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  profile: Profile = <Profile>{};
  profile$ = this.store.select('profile', 'profile');
  currentPage?: string = '';
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  isToken: string = '';

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
    private auth: Auth
  ) {
    this.profile$.subscribe((value) => {
      if (value) {
        this.profile = value;
        console.log('profilesidebar', value);
      }
    });
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user!.getIdToken(true);
        this.isToken = idToken;
        console.log('idToken', idToken);
        this.store.dispatch(
          ProfileActions.get({ id: user.uid, idToken: idToken })
        );
        console.log('profile', user);
      } else {
        console.log('no user', user);
      }
    });
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
  // navProfile = [
  //   {
  //     icon: 'account_circle',
  //     text: 'Profile',
  //     backgroundColor: false,
  //     route: `/profile/${this.profile.id}`,
  //   },
  // ];

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
        // const profileId = this.profile.id; // Thay bằng id của user
        // nav.route = `/profile/${profileId}`;

        nav.backgroundColor = true;
        this.currentPage = nav.route;
      } else {
        nav.backgroundColor = false;
        // Đặt lại màu nền cho biểu tượng cũ
      }
    });

    this.router.navigate([selectedNav.route]);
  }
  // toProfile(selectedNav: any) {
  //   if (selectedNav.backgroundColor) {
  //     return;
  //   }

  //   this.navProfile.forEach((item) => {
  //     if (item == selectedNav) {
  //       item.backgroundColor = true;

  //     } else {
  //       item.backgroundColor = false;
  //       // Đặt lại màu nền cho biểu tượng cũ
  //     }
  //   });

  //   this.router.navigate([selectedNav.route]);
  // }
  return(icon: string) {
    // Chuyển hướng đến trang home
    this.router.navigate(['/home']);

    // Đặt màu nền của biểu tượng tương ứng thành true và của các biểu tượng khác thành false
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
