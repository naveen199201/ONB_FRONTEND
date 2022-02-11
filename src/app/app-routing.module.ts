import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './posts/create/create.component';
import { EditComponent } from './posts/edit/edit.component';
import {SignInComponent}  from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AdminsComponent} from './admins/admins.component';


const routes: Routes = [
  {path:'',redirectTo:'signin', pathMatch: 'full'},
  {path: 'signin', component:  SignInComponent },
  {path:'signup', component: SignUpComponent },
  {path:'home', component:HomeComponent},
  {path:'admin/signup',component:AdminSignupComponent},
  {path: 'posts/create', component:CreateComponent},
  {path: 'post/edit/:id',component:EditComponent},
  {path: 'admins',component:AdminsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
