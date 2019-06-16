import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {RegisterService} from '../../../services/auth/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  registerSubmit: boolean;
  noPasswordMatch: boolean;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      usernameControl: new FormControl('',{
        validators: [Validators.required]
      }),

      emailControl: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),

      passwordControl: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),

      passwordRepeatControl: new FormControl('', {
        validators: [Validators.required]
      })
    })
  }

  get formControls(){
    return this.registerForm.controls;
  }

  register(){
    this.registerSubmit = true;

    if(!this.checkPasswords()){
      this.noPasswordMatch = true;
      return;
    }
    this.noPasswordMatch = false;

    if(this.registerForm.invalid)
      return;

    this.registerService.registerUser(this.formControls.usernameControl.value, this.formControls.emailControl.value, this.formControls.passwordControl.value)
  }

  checkPasswords(){
    let password = this.formControls.passwordControl.value;
    let passwordCheck = this.formControls.passwordRepeatControl.value;

    return password === passwordCheck;
  }

}
