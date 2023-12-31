import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { LABEL_BUTTON_LOGIN, LABEL_LINK_REGISTER, LABEL_REGISTER_SUBTEXT, TITLE_LOGIN } from '../shared/constants';
import { LoginForm } from '../interfaces/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PasswordModule, ReactiveFormsModule,InputTextModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  titleLabel:string = TITLE_LOGIN;
  loginLabelBtn:string = LABEL_BUTTON_LOGIN;
  subtext:string = LABEL_REGISTER_SUBTEXT;
  linkLabel:string = LABEL_LINK_REGISTER;

  loginForm = new FormGroup<LoginForm>({
    login: new FormControl<string|null>(null,[Validators.required]),
    password: new FormControl<string|null>(null,[Validators.required]),
  });

  constructor(private authService:AuthService){}

  handlerLoginBtn():void {
    const LOGIN = this.loginForm.get("login")?.value
    const PASSWORD = this.loginForm.get("password")?.value
    if(LOGIN && PASSWORD)
      this.authService.login(LOGIN,PASSWORD);
  }

}
