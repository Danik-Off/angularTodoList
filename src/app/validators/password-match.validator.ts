import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPasswords: ValidatorFn = (
  controlConfirmPassword: AbstractControl,
): ValidationErrors | null => {
  let group = controlConfirmPassword.parent;
  let pass = group?.get('password')?.value;
  let confirmPass = controlConfirmPassword?.value;
  return pass === confirmPass ? null : { notSame: true };
};
