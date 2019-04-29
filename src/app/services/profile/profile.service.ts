import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {UserProfileResponse} from '../../models/dto/user-dto/user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private router : Router) { }


  getPrivateProfile(){
    return this.http.get<UserProfileResponse>(environment.apiUrl + '/profile/private/me', {observe: 'response'});
  }

  getPublicProfile(userName: string){
    console.log("Getting profile for: " + userName)
    console.log("Todo: finish getting public profile in services/profile.service.ts")
  }


}
