import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ProfileComponent } from './profile/profile.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { CreateComponent } from './posts/create/create.component';
import { EditComponent } from './posts/edit/edit.component';
import { DeleteComponent } from './posts/delete/delete.component';
import { AdminsComponent } from './admins/admins.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    AdminSignupComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    AdminsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    DataTablesModule,
    // BootstrapIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
