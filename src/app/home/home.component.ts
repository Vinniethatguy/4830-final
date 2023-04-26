import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  // submit(form: NgForm) {
  //   console.log(form.value);
  //   console.log('Form submitted');
  //   form.resetForm();
  // }

  constructor(public userService: ApiService){};

  onAddUser(form: NgForm){

    if(form.invalid){
      "Invalid length";
    }

    this.userService.addUser(form.value.firstname,
      form.value.lastname,
      form.value.email,
      form.value.password);
    console.log("Printed");
    form.resetForm();
  }
}
