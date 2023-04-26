import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import{User} from './user.model';

@Injectable({providedIn: 'root'})

export class ApiService{
  private users: User[] = [];
  private userUpdate = new Subject<User[]>();

  constructor(private http: HttpClient){};

  getPosts(){
    this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/posts')
    .subscribe((userData) => {
      this.users = userData.users;
      this.userUpdate.next([...this.users]);
    });
    // return [...this.posts];
  }

  getPostUpdateListener(){
    return this.userUpdate.asObservable();
  }

  addUser(fname: string, lname: string, email: string, password: string){
    const user: User = {firstname: fname, lastname: lname, email: email, password: password};
    this.http.post<{message: string}>("http://localhost:3000/api/users", user)
    .subscribe((responseData) => {
      console.log(responseData.message)
      this.users.push(user);
      this.userUpdate.next([...this.users]);
  });
  }
}