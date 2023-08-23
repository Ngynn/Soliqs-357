import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  constructor(private router: Router ) { }

  backToChatbox() {
    this.router.navigate(['chat/user']);
  }
}
