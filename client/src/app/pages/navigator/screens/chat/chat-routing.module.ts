import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ListmessagesComponent } from './components/listmessages/listmessages.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'user',
        component: ListmessagesComponent,
        // children: [
        //   {
        //     path: 'id',
        //     component: ChatboxComponent,
        //   },
        // ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
