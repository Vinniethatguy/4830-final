import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component'

const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path:'register', component: HomeComponent
  },
  {
  path:'landing',component: LandingComponent
  },
  {
  path:'contact',component: ContactComponent
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, LandingComponent, ContactComponent];
