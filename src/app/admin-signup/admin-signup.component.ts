import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    last_login: null,
    is_superuser: false,
    first_name: null,
    last_name: null,
    "is_staff": false,
    "is_active": true,
    "date_joined": null,
    "role": "2",
    "active":false
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // const { username, email, password } = this.form;
    this.form.date_joined=new Date()
    this.form.username=this.form.email
    this.authService.registerAdmin(this.form).subscribe(
      (res: any) => {
        if (res && res.status == 200) {
          this.isSuccessful=true
          this.isSignUpFailed=false
          this.errorMessage=''
          // alert(res.message)
          
          this.router.navigate(['signin'])
        } else {
        }
      },  (error) => {                              //Error callback
        this.isSignUpFailed=true
        this.isSuccessful=false
        let keys = Object.keys(error.error);  
        this.errorMessage=error.error[keys[0]]
        // alert(error.error[keys[0]])
        console.error('error caught in component',error.error[keys[0]])
      }
      )
  }
}
