import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { User} from './user.model';
import { Contact } from './contact.model';
import { Login_User } from './login_user.model';

@Injectable({providedIn: 'root'})

export class ApiService{
  private users: User[] = [];
  private userUpdate = new Subject<User[]>();

  private userLogIn: Boolean = false;
  private userLogInUpdate = new Subject<Boolean>();

  constructor(private http: HttpClient, private router: Router){};

  getUserLogInStatus(){
    return this.userLogIn;
  }

  getLoginUpdateListener(){
    return this.userLogInUpdate.asObservable();
  }

  loginUser(email: string, password: string){
    const login_info: Login_User = {email: email, password: password};

    this.http.post<{message: string}>("http://localhost:3000/api/user_login", login_info)
    .subscribe((responseData) => {
      console.log(responseData.message)

      if(responseData.message.includes("successfully")){
        console.log("Login success")
        this.userLogIn = true;
        this.router.navigate(["/landing"]);
      }
      else{
        this.userLogIn = false;
        this.router.navigate([""]);
      }
  });
  }

  addUser(fname: string, lname: string, email: string, password: string){
    const user: User = {firstname: fname, lastname: lname, email: email, password: password};
    this.http.post<{message: string}>("http://localhost:3000/api/users", user)
    .subscribe((responseData) => {
      console.log(responseData.message)
      if(responseData.message.includes("successfully")){
        console.log("Registration success")
        this.router.navigate(["/"]);
      }
      else{
        this.userLogIn = false;
        this.router.navigate(["/register"]);
      }

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
