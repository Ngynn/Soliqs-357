import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { SharedModule } from 'src/shared/shared.module';
import { SuggestComponent } from './components/suggest/suggest.component';
import { InternalComponent } from './components/internal/internal.component';

@NgModule({
  declarations: [GroupComponent, SuggestComponent, InternalComponent],
  imports: [CommonModule, GroupRoutingModule, SharedModule],
})
export class GroupModule {}
