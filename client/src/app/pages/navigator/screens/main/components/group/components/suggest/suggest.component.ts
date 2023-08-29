import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent {
  constructor(private router: Router, private location: Location) {}
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
