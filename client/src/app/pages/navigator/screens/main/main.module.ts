import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [MainComponent, HomeComponent, DetailComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
