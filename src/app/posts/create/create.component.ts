import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: any = {
    title: null,
    description: null
  }
  postTypes = [{ value: "1", name: "Circulars" },
  { value: "2", name: "Results" },
  { value: "3", name: "Payments" },
  { value: "4", name: "Workshops" },
  { value: "5", name: "Remainders" },
  { value: "6", name: "New Activity" }
  ]
  batches = [{ name: 'First', value: '1' }, { name: 'Second', value: 2 }]
  specializations = [{ name: 'Marketing', value: '1' }, { name: 'Finance', value: '2' }, { name: 'Systems', value: 3 }, { name: 'HR', value: '4' }, { name: 'Logistics and supply chain', value: 5 }]
  errorMessage = ''
  selectedFile: File | any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onFileSelected(event:any, imageFor:any) {
    this.selectedFile = <File>event.target.files[0];
    // this.onUpload(imageFor);
  }
  
  onSubmit(): void {
    console.log(this.form);
    this.form['attachment'] = this.selectedFile;
    // , this.selectedFile.name);
    this.authService.createPost(this.form).subscribe(
      (res: any) => {
        if (res && res.status == 200) {

          this.router.navigate(['home'])
        } else {
        }
      }, (error: any) => {                              //Error callback
        // this.isSignUpFailed=true
        // this.isSuccessful=false
        let keys = Object.keys(error.error);
        this.errorMessage = error.error[keys[0]]
        // alert(error.error[keys[0]])
        console.error('error caught in component', error.error[keys[0]])
      }
    )
  }

}
