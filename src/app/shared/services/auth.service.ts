import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSource = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  constructor(private http: HttpClient) {
    const loggedIn = !!localStorage.getItem('user');
    this.updatetatus(true);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  updatetatus(status: boolean) {
    this.isLoggedInSource.next(status);
  }

  signOut() {
    localStorage.clear();
    this.isLoggedInSource.next(false);
  }
}
