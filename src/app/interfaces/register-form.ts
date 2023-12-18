import { FormControl } from "@angular/forms";

export interface RegisterForm {
  name: FormControl<string|null>;
  login: FormControl<string|null>;
  password: FormControl<string|null>;
  repeatPassword: FormControl<string|null>;
}
