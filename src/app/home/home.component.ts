import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  submit(form: NgForm) {
    console.log(form.value);
    console.log('Form submitted');
    form.resetForm();
  }

}
