import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  get auth() : boolean {
    return this.loginService.isAuthenticated();
  }

}
