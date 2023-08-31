import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupState } from 'src/app/ngrx/states/group.state';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';
import { Observable } from 'rxjs';
import * as GroupAction from 'src/app/ngrx/actions/group.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { FormControl, FormGroup } from '@angular/forms';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserState } from 'src/app/ngrx/states/user.state';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent {
  itGetSuccess$ = this.store.select('group', 'isGetSuccess');
  itCreateSuccess$ = this.store.select('group', 'isSuccess');
  errorMessage$ = this.store.select('group', 'errorMessage');
  groups: Group[] = []; 

  groups$:  Observable<Group[]> = this.store.select('group', 'groups');



  user$ = this.store.select('user', 'user');


  name: string = '';
  owner: string = '';
  members: string[] = [];
  posts: string[] = [];
  groupForm = new FormGroup({
    name: new FormControl(''),
  });

  groupData = {
    name: '',

  };


  constructor(private router: Router, private location: Location,private auth:Auth, private store: Store<{group: GroupState; user:UserState}>) {
    
    
    
    this.store.dispatch(GroupAction.get({name:''}));
    
    this.groups$.subscribe((groups) => {
      this.groups = groups;
      console.log(groups);
    });
    
  }

  // getGroups() {
  //   this.store.dispatch(GroupAction.get({name:'soliq'}));
  // }

  createGroup() {
    this.groupData = {
      name: this.groupForm.value.name ?? '',
    };

    this.store.dispatch(GroupAction.create({group: <Group>this.groupData}));
  }

  goToInternal() {
    this.router.navigate(['/group/internal']);
  }
  back() {
    this.location.back();
  }
  buttonText: string = 'Join';

  joined: boolean = false;

  join(): void {
    this.joined = true;
  }

  @ViewChild('createGroupDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  } 

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }


  
}
