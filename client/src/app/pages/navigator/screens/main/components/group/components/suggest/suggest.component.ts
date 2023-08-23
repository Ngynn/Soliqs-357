import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent {
  constructor(private router: Router) {}
  goToInternal() {
    this.router.navigate(['/group/internal']);
  }
}
