import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(public contactService: ApiService){

  };

    onAddMessage(form: NgForm){

      if(form.invalid){
        "Invalid length";
      }

      this.contactService.addMessages(form.value.customerName,
        form.value.customerEmail,
        form.value.message);
      console.log("Printed");
      form.resetForm();
    }
}
