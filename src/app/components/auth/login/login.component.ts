import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loginSubmit: boolean;

  constructor() { }

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

    console.log('login' + environment.production);

  }

  get loginFormControls(){
    return this.loginForm.controls;
  }

}
