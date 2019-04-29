import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private router : Router) { }


  getProfile(){
    console.log("getting profile")

    this.http.get(environment.apiUrl + '/profile/private/me', {observe: 'response'}).subscribe(
      (response) => {
        console.log(response)



        this.router.navigateByUrl('/profile')
      }
    )


  }


}
