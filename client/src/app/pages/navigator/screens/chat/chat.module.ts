import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListmessagesComponent } from './listmessages/listmessages.component';
import { ChatboxComponent } from './chatbox/chatbox.component';




@NgModule({
  declarations: [
    ChatComponent,
    ListmessagesComponent,
    ChatboxComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
