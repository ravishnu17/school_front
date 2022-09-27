import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TestComponent } from './test/test.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:'general',component:GeneralInfoComponent},
  {path:"register",component:RegisterComponent},
  {path:'test',component:TestComponent},

  {path:"main",component:MainComponent , 
      children:[
      {path:'home',component:HomeComponent},
      {path:'profile',component:ProfileComponent },
      {path:'schoolProfile', component:SchoolProfileComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
