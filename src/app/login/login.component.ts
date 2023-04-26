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

  // onAddUser(form: NgForm){

  //   if(form.invalid){
  //     return "Invalid length";
  //   }

  //   this.userService.addUser(form.value.firstname,
  //     form.value.lastname,
  //     form.value.email,
  //     form.value.password);
  //   console.log("Printed");
  //   form.resetForm();
  // }

}
