import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox2',
  templateUrl: './chatbox2.component.html',
  styleUrls: ['./chatbox2.component.scss']
})
export class Chatbox2Component {
  constructor(private router: Router ) { }

  isInfo = false;
  goToInfo() {
    this.isInfo = true;
    this.router.navigate(['chat/inbox/info']);
  }

  goToChatbox() {
    this.router.navigate(['chat/inbox/id']);
    
  }
}
