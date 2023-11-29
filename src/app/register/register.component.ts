import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
    // Ваш код инициализации компонента
  }
  //проверка на совпадение паролей
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }


  registerForm = new FormGroup({
    login: new FormControl(null, [
      Validators.required,
      Validators.minLength(5), // Пример минимальной длины
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50), // Пример максимальной длины
    ]),
    password: new FormControl(null, [
      Validators.required,

    ]),
    repeatPassword: new FormControl(null, [
      Validators.required,
       // Пример требований к паролю
     this.checkPasswords
    ]),
  });

  handlerRegisterBtn() {
    let name = this.registerForm.get('name')?.value;
    let login = this.registerForm.get('login')?.value;
    let password = this.registerForm.get('password')?.value;

    if (!!name && !!login && !!password) {
      this.authService.register(name, login, password);
    }
  }
}
