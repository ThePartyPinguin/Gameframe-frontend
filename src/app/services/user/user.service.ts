import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  getUserId() : number{
    return +localStorage.getItem(environment.user_id);
  }
}
