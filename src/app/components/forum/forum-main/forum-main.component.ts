import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/authentication.guards';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  get authenticated(){
    return this.loginService.isAuthenticated();
  }

}
