import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorComponent } from './navigator.component';

const routes: Routes = [
  {
    path: '',
    component: NavigatorComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./screens/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./screens/chat/chat.module').then((m) => m.ChatModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigatorRoutingModule {}
