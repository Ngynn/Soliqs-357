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
import { profileReducer } from './ngrx/reducers/profile.reducer';
import { ProfileEffect } from './ngrx/effects/profile.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ auth: authReducer, user: userReducer, profile: profileReducer }, {}),
    EffectsModule.forRoot([AuthEffects, UserEffects,ProfileEffect]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
