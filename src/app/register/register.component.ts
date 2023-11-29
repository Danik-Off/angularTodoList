import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,PasswordModule,InputTextModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    login: new FormControl(null),
    name: new FormControl(null),
    password: new FormControl(null),
  });
}
