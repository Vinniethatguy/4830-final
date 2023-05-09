import { Component } from "@angular/core";
import { NgModel } from "@angular/forms";

@Component
({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class Recipes{
  treats = ['Baker Boss Muffin', 'Baker Boss Cupcake', 'Baker Boss Cake', 'Baker Boss Brownie'];
}
