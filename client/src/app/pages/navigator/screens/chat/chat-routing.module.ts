import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListmessagesComponent } from './components/listmessages/listmessages.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { DefaultchatComponent } from './components/defaultchat/defaultchat.component';
import { ChatComponent } from './chat.component';
import { Chatbox2Component } from './components/chatbox2/chatbox2.component';
import { ConversationComponent } from './components/conversation/conversation.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultchatComponent,
    
  },
  {
    path: 'inbox',
    component: ListmessagesComponent,
    children: [
      {
        path: 'id',
        component: ChatboxComponent,
      },
      {
        path: 'id2',
        component: Chatbox2Component,
      },
      {
        path: 'info',
        component: ConversationComponent,
      },
    ],
  },
  // {
  //   path: 't/:id',
  //   component: ChatboxComponent,
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
