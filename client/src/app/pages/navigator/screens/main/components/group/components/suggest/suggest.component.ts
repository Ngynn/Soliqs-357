import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupState } from 'src/app/ngrx/states/group.state';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';
import { Observable } from 'rxjs';
import * as GroupAction from 'src/app/ngrx/actions/group.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';

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

  constructor(private router: Router, private location: Location, private store: Store<{group: GroupState}>) {
    this.store.dispatch(GroupAction.get({name:'soliq'}));
    
    this.groups$.subscribe((groups) => {
      this.groups = groups;
      console.log(this.groups);
    });
    
  }

  // getGroups() {
  //   this.store.dispatch(GroupAction.get({name:'soliq'}));
  // }

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

  
}
