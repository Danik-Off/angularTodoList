import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private user: User | undefined;

  constructor(private router: Router) {
    // Ваш код инициализации компонента
  }

  getUsers(): User[] {
    const USERS_JSON = localStorage.getItem('users');
    return JSON.parse(USERS_JSON ? USERS_JSON : '[]') as User[];
  }

  //обьект авторизованного пользователя
  getUser() {
    return this.user;
  }

  //регистрация нового пользователя
  register(name: string, login: string, password: string) {
    this.isAuthenticated = true;
    console.log(this.isAuthenticated);
    this.user = {
      id: crypto.randomUUID() as string,
      name: name,
      login: login,
      password: password,
    };
    const NEW_USERS = this.getUsers();
    NEW_USERS.push(this.user);
    localStorage.setItem('users', JSON.stringify(NEW_USERS));

    this.router.navigate(['/']);
  }

  //локальная авторизация пользователей
  login(login: string, password: string) {
    console.log("ok");
    const user = this.getUsers().find((user) => user.login === login);
    if (user && user.password === password) {
      this.user = user;
      this.isAuthenticated = true;
      this.router.navigate(['/']);

    } else {
    }
  }

  //выйти из аккаунта
  logout() {
    this.isAuthenticated = false;
    this.user = undefined;
  }

  // проверка , авторизован ли пользователь
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
