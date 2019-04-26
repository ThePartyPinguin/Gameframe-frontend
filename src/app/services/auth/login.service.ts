import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {LoginResponseDto} from '../../models/dto/login-response-dto/login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string;

  constructor(private http: HttpClient, private router: Router, private profileService : ProfileService) {
    this.apiUrl = environment.apiUrl
  }

  loginUser(loginName: string, password: string){
    this.logoutUser();

    return this.http.post<LoginResponseDto>(this.apiUrl + '/auth/public/signin', {loginName, password}, {observe: 'response'}).subscribe(
      (response) =>{

        if(response.body.responseCode == 501){
          alert(response.body.responseMessage);
          return;
        }

        window.localStorage.setItem(environment.user_token, "Bearer " + response.body.token);
        window.localStorage.setItem(environment.user_id, "" + response.body.userId);

        this.profileService.getProfile();
      }
    )
  }



>>>>>>> feature/auth/login
  logoutUser(){
    window.localStorage.removeItem(environment.user_token);
    this.router.navigateByUrl('');
  }

}
