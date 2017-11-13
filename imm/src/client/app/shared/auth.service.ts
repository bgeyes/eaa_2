import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey: string = 'contact-manager-jwt';
  user: string;

  constructor(private router: Router) { }

  setToken(token: string, user: string) {
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem(this.user, user);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  getUser() {
    return localStorage.getItem(this.user);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

}
