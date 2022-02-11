import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(this.form)
    .subscribe((res:any)=>{ 
      if(res&& res.status==200){
        alert(res.message)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('role',res.data.role)
        localStorage.setItem('active',res.data.is_staff)
        this.router.navigate(['home'])
      }

    },(error)=>{
      console.log(error)
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}