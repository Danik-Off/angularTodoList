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
import { RegisterForm } from '../interfaces/register-form';



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
  constructor(private authService: AuthService) {}

  //проверка на совпадение паролей
  checkPasswords: ValidatorFn = (
    group: AbstractControl,
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  registerForm = new FormGroup<RegisterForm>({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    login: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl(null, [Validators.required]),
    repeatPassword: new FormControl(null, [
      Validators.required,
      this.checkPasswords,
    ]),
  });

  handlerRegisterBtn() {
    if (this.registerForm.valid) {
      let name = this.registerForm.get('name')?.value;
      let login = this.registerForm.get('login')?.value;
      let password = this.registerForm.get('password')?.value;

      if (!!name && !!login && !!password)
        this.authService.register(name, login, password);
    } else {
    }
  }
}
