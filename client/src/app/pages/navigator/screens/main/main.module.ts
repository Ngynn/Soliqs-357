import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { GroupComponent } from './components/group/group.component';

@NgModule({
  declarations: [MainComponent, HomeComponent, SearchComponent, GroupComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
