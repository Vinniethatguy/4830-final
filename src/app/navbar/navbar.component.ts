import { Component } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public userService: ApiService){

  };


}
