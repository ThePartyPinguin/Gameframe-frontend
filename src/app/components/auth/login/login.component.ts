import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loginSubmit: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
      this.loginForm = new FormGroup({
        loginUsername: new FormControl('', {
          validators: [Validators.required]
        }),

        password: new FormControl('', {
          validators: [Validators.required]
        })
      })



  }

  login() {

    this.loginSubmit = true;

    if (!this.loginForm.valid) {
      return;
    }

    this.loginService.loginUser(this.loginFormControls.loginUsername.value, this.loginFormControls.password.value);
  }

  get loginFormControls(){
    return this.loginForm.controls;
  }

}
