import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/shared/shared.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authReducer } from './ngrx/reducers/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './ngrx/reducers/user.reducer';
import { UserEffects } from './ngrx/effects/user.effects';
import { AuthEffects } from './ngrx/effects/auth.effects';
import { DetailComponent } from './pages/detail/detail.component';
import { profileReducer } from './ngrx/reducers/profile.reducer';
import { ProfileEffect } from './ngrx/effects/profile.effects';
import { postReducer } from './ngrx/reducers/post.reducer';
import { PostEffects } from './ngrx/effects/post.effects';
import { groupReducer } from './ngrx/reducers/group.reducer';
import { GroupEffects } from './ngrx/effects/group.effects';
@NgModule({
  declarations: [AppComponent, DetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(
      {
        auth: authReducer,
        user: userReducer,
        profile: profileReducer,
        post: postReducer,
        group: groupReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      ProfileEffect,
      PostEffects,
      GroupEffects,
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
