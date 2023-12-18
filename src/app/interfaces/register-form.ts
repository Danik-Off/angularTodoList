import { FormControl } from "@angular/forms";

export interface RegisterForm {
  name: FormControl<string>;
  login: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
