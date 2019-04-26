import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private router : Router) { }


  getProfile(){
    console.log("getting profile")

    this.router.navigateByUrl('/profile')

  }


}
