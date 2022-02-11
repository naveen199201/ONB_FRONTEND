import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
    "date_joined":null,
    "role": "0",
    "batch": null,
    "specialization": null,
    "profile": null,
    "last_read": null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  batches=[{name:'First',value:'1'},{name:'Second',value:2}]
  specializations=[{name:'Marketing',value:'1'},{name:'Finance',value:'2'},{name:'Systems',value:3},{name:'HR',value:'4'},{name:'Logistics and supply chain',value:5}]
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // const { username, email, password } = this.form;
    this.form.date_joined=new Date()
    this.form.username=this.form.email
    this.authService.register(this.form).subscribe(
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
