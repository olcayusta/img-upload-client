import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   /* const loggedIn = !!localStorage.getItem('user');
    this.updatetatus(loggedIn);*/
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    this.currentUserSubject.next(user);
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
