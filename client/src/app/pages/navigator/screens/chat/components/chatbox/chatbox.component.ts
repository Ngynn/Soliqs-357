import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  
  constructor(private router: Router ) { }

  isInfo = false;
  goToInfo() {
    this.isInfo = true;
    this.router.navigate(['chat/user/info']);
  }

  




}
