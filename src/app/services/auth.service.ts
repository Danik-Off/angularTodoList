import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticated: boolean = false;
  private user: User | undefined;

  constructor() {}

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
    this.user = { id: 1, name: name, login: login, password: password };
    const NEW_USERS = this.getUsers();
    NEW_USERS.push(this.user);
    localStorage.setItem('users', JSON.stringify(NEW_USERS));
  }

  //локальная авторизация пользователей
  login(login: string, password: string) {
    const user = this.getUsers().find((user) => user.login === login);

    if (user && user.password === password) {
      this.isAuthenticated = true;
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
