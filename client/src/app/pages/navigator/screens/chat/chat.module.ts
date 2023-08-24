import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListmessagesComponent } from './components/listmessages/listmessages.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { DefaultchatComponent } from './components/defaultchat/defaultchat.component';
import { Chatbox2Component } from './components/chatbox2/chatbox2.component';
import { ConversationComponent } from './components/conversation/conversation.component';




@NgModule({
  declarations: [
    ChatComponent,
    ListmessagesComponent,
    ChatboxComponent,
    DefaultchatComponent,
    Chatbox2Component,
    ConversationComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
