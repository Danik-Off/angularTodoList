import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PasswordModule, ReactiveFormsModule,InputTextModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService:AuthService){}
  loginForm = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
  });
  hadlerLoginBtn():void {
    let login = this.loginForm.get("login")?.value
    let password = this.loginForm.get("password")?.value
    if(!!login && !!password)
      this.authService.login(login,password);
  }

}
