import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  constructor(private router: Router) {}

  login() {
    this.loggedIn = true;
  }

  logout() {
    const isPokemonPage = /^\/pokemon\//.test(this.router.url);
    this.loggedIn = false;
    if (isPokemonPage) {
      this.router.navigate(['/']);
    }
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }
}
