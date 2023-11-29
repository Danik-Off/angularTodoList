import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//проверяем авторизован ли пользователь
export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticatedUser()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
