import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
    import('./pages/login/login.module').then((m) => m.LoginModule), 
  },
  {
    path: 'register',
    loadChildren: () =>
    import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/navigator/navigator.module').then(
        (m) => m.NavigatorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
