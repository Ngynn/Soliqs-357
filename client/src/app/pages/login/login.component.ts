import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';

import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as UserAction from '../../ngrx/actions/user.actions';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
interface userExistsError {
  status: number;
  message: string;
  name: string;
}
interface invalidError {
  statusCode: number;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSuccess$ = this.store.select('user','isSuccess')
  idToken$: Observable<string> = this.store.select('idToken','idToken');
  message$ = this.store.select('user','message')
  constructor(private auth: Auth, private authService: AuthService, private store: Store<{ idToken: AuthState, user: UserState }>, private _snackBar: MatSnackBar) {
    this.idToken$.subscribe(value =>{

      
      if(value){
        console.log('làm đúng r');
        console.log(value);
        this.store.dispatch(UserAction.createUser({idToken:value}))
      }
    })
    this.isSuccess$.subscribe((value) => {
      console.log(value);
      if (value) {
        console.log('add User success');
      }
    })
    this.message$.subscribe((value) =>{
      console.log(value);
      if(this.isUserObject(value))
      {
        let content: string = 'user created with email: '+ value.email
        this.openSnackBar(content)
      }
      else if(this.isCustomError(value))
      {
        let content: string = 'This email is already in use for another user'
        this.openSnackBar(content)
      }
      else if(this.isInvalidError(value)){
        let content: string = 'Invalid email'
        this.openSnackBar(content);
      }

    })
  }
  isInvalidError(obj: any): obj is invalidError {
    return (
      typeof obj === 'object' &&
      'statusCode' in obj && typeof obj.statusCode === 'number' &&
      'message' in obj && typeof obj.message === 'string'
    );
  }

  isCustomError(obj: any): obj is userExistsError {
    return (
      typeof obj === 'object' &&
      'status' in obj && typeof obj.status === 'number' &&
      'message' in obj && typeof obj.message === 'string' &&
      'name' in obj && typeof obj.name === 'string'
    );
  }
  isUserObject = (obj: any): obj is User => {
    return (
      obj &&
      typeof obj.createdAt === 'string' &&
      typeof obj.email === 'string' &&
      typeof obj.name === 'string' &&
      typeof obj.picture === 'string' &&
      typeof obj.uid === 'string' &&
      typeof obj.updatedAt === 'string' &&
      typeof obj.__v === 'number' &&
      typeof obj._id === 'string'
    );
  };

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  openSnackBar(message:string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'end'; // Hiển thị ở bên phải
    config.verticalPosition = 'top'; // Hiển thị ở góc trên
    this._snackBar.open(message, 'close', {
      panelClass: 'snackbar-user'
    });
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 200000);
  }

  logout() {
    this.authService.logout();
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
