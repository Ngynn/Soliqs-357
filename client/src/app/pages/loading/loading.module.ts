import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingComponent } from './loading.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, LoadingRoutingModule, SharedModule],
})
export class LoadingModule {}
