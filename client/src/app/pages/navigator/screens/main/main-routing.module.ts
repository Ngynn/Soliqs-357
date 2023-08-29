import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './components/home/home.component';

import { SearchComponent } from './components/search/search.component';
import { GroupComponent } from './components/group/group.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      // {
      //   path: 'detail',
      //   component: DetailComponent,
      // },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./components/group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
