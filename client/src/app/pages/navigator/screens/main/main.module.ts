import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
<<<<<<< HEAD:client/src/app/pages/main/main.module.ts
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from 'src/shared/material.module';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
=======
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
>>>>>>> d17543ce21ecedb465d2f2ac37e119446b8a4918:client/src/app/pages/navigator/screens/main/main.module.ts
})
export class MainModule {}
