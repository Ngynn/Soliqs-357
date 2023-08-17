import { Component, OnInit, Input } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  constructor(private overlayContainer: OverlayContainer) {}
  navItems = [
    { icon: 'home', text: 'Home', backgroundColor: false },
    { icon: 'search', text: 'Search', backgroundColor: false },
    { icon: 'notifications', text: 'Notifications', backgroundColor: false },
    { icon: 'chat', text: 'Message', backgroundColor: false },
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
  }
}
