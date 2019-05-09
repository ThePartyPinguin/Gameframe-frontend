import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import {LoginService} from './services/auth/login.service';
import {ProfileService} from './services/profile/profile.service';
import {AuthHeader} from './interceptors/auth-header.interceptor';
import {AuthHeaderResponseInterceptor} from './interceptors/auth-header-response.interceptor';
import {RegisterService} from './services/auth/register.service';
import { LoaderComponent } from './components/helpers/loader/loader.component';
import { ForumMainComponent } from './components/forum/forum-main/forum-main.component';
import { ForumPostSummaryComponent } from './components/forum/forum-post-summary/forum-post-summary.component';
import {AuthGuard} from './guards/authentication.guards';
import {LogoutComponent} from './components/auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    LoaderComponent,
    LogoutComponent,
    ForumMainComponent,
    ForumPostSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    RegisterService,
    ProfileService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeader,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
