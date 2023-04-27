import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import{User} from './user.model';
import { Contact } from './contact.model';
import { Login_User } from './login_user.model';

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

  loginUser(email: string, password: string){
    const login_info: Login_User = {email: email, password: password};

    this.http.post<{message: string}>("http://localhost:3000/api/user_login", login_info)
    .subscribe((responseData) => {
      console.log(responseData.message)
  });
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

  addMessages(customername: string, email: string, message: string){
    const sms: Contact = {customerName: customername, email: email, message: message};
    this.http.post<{message: string}>("http://localhost:3000/api/sms", sms)
    .subscribe((responseData) => {
      console.log(responseData.message)
    });
  }
}
