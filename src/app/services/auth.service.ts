import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private isAuthenticated: boolean = false;
  private user:User | undefined ;

  constructor() { }

  //локальная авторизация пользователей
  login(login:string,password:string) {
    const USERS_JSON = localStorage.getItem("users");
    const USERS = JSON.parse(USERS_JSON?USERS_JSON:"[]") as User[];
    const user = USERS.find(user => user.login === login);

    if (user && user.password === password) {
      this.isAuthenticated = true;
    } else {

    }
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
