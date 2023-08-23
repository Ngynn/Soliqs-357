import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListmessagesComponent } from './components/listmessages/listmessages.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ConversationComponent } from './conversation/conversation.component';
import { DefaultchatComponent } from './components/defaultchat/defaultchat.component';




@NgModule({
  declarations: [
    ChatComponent,
    ListmessagesComponent,
    ChatboxComponent,
    ConversationComponent,
    DefaultchatComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
