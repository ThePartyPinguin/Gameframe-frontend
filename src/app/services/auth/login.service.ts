import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl
  }

  loginUser(loginName: string, password: string){
    this.logoutUser()

    return this.http.post(this.apiUrl + '/auth/signin', {loginName, password}, {observe: 'response'}).subscribe(
      (response) =>{
        //const token = response.
      }
    )

  }

  logoutUser(){
    window.localStorage.removeItem(environment.user_token);
    this.router.navigateByUrl('');
  }

}
