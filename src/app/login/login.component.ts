import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public userService: ApiService){};

  onLoginUser(form: NgForm){

    if(form.invalid){
       "Invalid length";
    }

    this.userService.loginUser(form.value.email, form.value.password);

    console.log("Printed");
    form.resetForm();
  }

}
