import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {UserProfile} from '../../models/dto/user-dto/user-profile';
import {UserFollowedPostsDto} from '../../models/dto/posting/user-followed-posts-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private router : Router) { }


  getPrivateProfile(){
    return this.http.get<UserProfile>(environment.apiUrl + '/profile/private/me', {observe: 'response'});
  }

  getPublicProfile(userName: string){
    return this.http.get<UserProfile>(environment.apiUrl + '/profile/public/' + userName, {observe: 'response'});
  }

  updateProfile(userProfile : UserProfile){
    return this.http.put<UserProfile>(environment.apiUrl + '/profile/private/update', {user: userProfile.user, profile: userProfile.profile}, {observe : 'response'});
  }

  getFollowedPosts(){
    return this.http.get<UserFollowedPostsDto>(environment.apiUrl + '/post/private/follow/me');
  }


}
