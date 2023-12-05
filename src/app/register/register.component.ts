import { Component } from '@angular/core';
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
import { checkPasswords } from '../validators/password-match.validator';
import {
  LABEL_BUTTON_REGISTER,
  TITLE_REGISTER,
  LABEL_LOGIN_SUBTEXT,
  LABEL_LINK__LOGIN,
  LABEL_NAME,
  LABEL_LOGIN,
  LABEL_PASSWORD,
  LABEL_CONFIRM_PASSWORD,
} from '../shared/constants';


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

  titleLabel: string = TITLE_REGISTER;
  loginLabelBtn: string = LABEL_BUTTON_REGISTER;
  subtext: string = LABEL_LOGIN_SUBTEXT;
  linkLabel: string = LABEL_LINK__LOGIN;
  labelName: string = LABEL_NAME;
  labelLogin: string = LABEL_LOGIN;
  labelPassword: string = LABEL_PASSWORD;
  labelRepeatPassword: string = LABEL_CONFIRM_PASSWORD;


  registerForm!: FormGroup;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup<RegisterForm>({
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
        checkPasswords,
      ]),
    });
  }

  handlerRegisterBtn(): void {
    if (this.registerForm.valid) {
      let name = this.registerForm.get('name')?.value;
      let login = this.registerForm.get('login')?.value;
      let password = this.registerForm.get('password')?.value;

      if (name && login && password)
        this.authService.register(name, login, password);
    }
  }
}
