import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ListmessagesComponent } from './components/listmessages/listmessages.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ConversationComponent } from './conversation/conversation.component';
import { DefaultchatComponent } from './components/defaultchat/defaultchat.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultchatComponent,
    
  },
  {
    path: 't',
    component: ListmessagesComponent,
    // children: [
    //   {
    //     path: 'id',
    //     component: ChatboxComponent,
    //   },
    // ],
  },
  {
    path: 't/:id',
    component: ChatboxComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
