import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {AuthGuard} from './guards/authentication.guards';
import {LogoutComponent} from './components/auth/logout/logout.component';
import {ForumMainComponent} from './components/forum/forum-main/forum-main.component';
import {ForumCreatePostComponent} from './components/forum/forum-create-post/forum-create-post.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'timeline', component: LandingComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: 'forum', component: ForumMainComponent},
  {path: 'forum/post/new', component: ForumCreatePostComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
