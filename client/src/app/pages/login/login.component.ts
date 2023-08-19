import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';

import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: Auth, private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  openSignUpDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeSingUpDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
}
