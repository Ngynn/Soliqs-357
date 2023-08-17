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
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router
  ) {}

  navItems = [
    { icon: 'home', text: 'Home', backgroundColor: false, route: '/home' },
    { icon: 'search', text: 'Search', backgroundColor: false },
    { icon: 'notifications', text: 'Notifications', backgroundColor: false },
    { icon: 'chat', text: 'Message', backgroundColor: false, route: '/chat' },
    { icon: 'diversity_2', text: 'Group', backgroundColor: false },
    { icon: 'account_circle', text: 'Profile', backgroundColor: false },
  ];

  ngOnInit(): void {}

  // ? notice below
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
    this.navItems.forEach((nav) => {
      if (nav === selectedNav) {
        nav.backgroundColor = !nav.backgroundColor;
      } else {
        nav.backgroundColor = false; // Đặt lại màu nền cho biểu tượng cũ
      }
    });
    this.router.navigate([selectedNav.route]);
  }
  openPostDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closePostDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }
}
