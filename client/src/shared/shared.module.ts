import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { TrendingComponent } from 'src/app/components/trending/trending.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { DetailComponent } from 'src/app/components/detail/detail.component';
@NgModule({
  declarations: [
    SidebarComponent,
    TrendingComponent,
    PostComponent,
    DetailComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    TrendingComponent,
    PostComponent,
    DetailComponent,
  ],
})
export class SharedModule {}
