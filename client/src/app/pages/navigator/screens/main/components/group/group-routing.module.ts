import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './group.component';
import { SuggestComponent } from './components/suggest/suggest.component';
import { InternalComponent } from './components/internal/internal.component';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {
        path: 'suggest',
        component: SuggestComponent,
      },
      {
        path: 'internal',
        component: InternalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
