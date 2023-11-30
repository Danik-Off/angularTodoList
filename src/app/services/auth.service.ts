import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true);
  private userSubject = new BehaviorSubject<User | undefined>(undefined);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {}

  getUsers(): User[] {
    const USERS_JSON = localStorage.getItem('users');
    return JSON.parse(USERS_JSON ? USERS_JSON : '[]') as User[];
  }

  getUser() {
    return this.userSubject.value;
  }

  register(name: string, login: string, password: string) {
    const user: User = {
      id: crypto.randomUUID() as string,
      name: name,
      login: login,
      password: password,
    };

    const newUsers = [...this.getUsers(), user];
    localStorage.setItem('users', JSON.stringify(newUsers));

    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);

    this.router.navigate(['/']);
  }

  login(login: string, password: string) {
    const user = this.getUsers().find((user) => user.login === login);

    if (user && user.password === password) {
      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
