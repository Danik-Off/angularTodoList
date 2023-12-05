import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

const STORAGE_USERS_KEY = 'users';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {}

  getUsers(): User[] {
    const USERS_JSON = localStorage.getItem(STORAGE_USERS_KEY);
    return JSON.parse(USERS_JSON ? USERS_JSON : '[]') as User[];
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  register(name: string, login: string, password: string): void {
    const user: User = {
      id: crypto.randomUUID() as string,
      name: name,
      login: login,
      password: password,
    };

    const newUsers = [...this.getUsers(), user];
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(newUsers));

    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);

    this.router.navigate(['/']);
  }

  login(login: string, password: string): void {
    const user = this.getUsers().find((user) => user.login === login);

    if (user && user.password === password) {
      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
