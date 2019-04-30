import { Injectable } from '@angular/core';
import {LoginResponseDto} from '../../models/dto/login-response-dto/login-response-dto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }


  registerUser(userName: string, email: string, password: string){

    this.logoutUser();

    return this.http.post<LoginResponseDto>(this.apiUrl + '/auth/public/signup', {userName, email, password}, {observe: 'response'}).subscribe(
      (response) =>{

        if(response.body.responseCode == 501){
          alert(response.body.responseMessage);
          return;
        }

        window.localStorage.setItem(environment.user_token, "Bearer " + response.body.token);
        window.localStorage.setItem(environment.user_id, "" + response.body.userId);

        this.router.navigateByUrl('/profile');
      }
    )
  }

  logoutUser(){
    window.localStorage.removeItem(environment.user_token);
    this.router.navigateByUrl('');
  }

}
