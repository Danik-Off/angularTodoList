import { FormControl } from "@angular/forms";

export interface RegisterForm {
  name: FormControl;
  login: FormControl;
  password: FormControl;
  repeatPassword: FormControl;
}
