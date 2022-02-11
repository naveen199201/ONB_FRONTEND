import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: any = {
    title: null,
    description: null
  }
  id: any
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
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   console.log(params)
    //   this.id = params['id'];
    // });
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.authService.getPost(this.id).subscribe(
      (res: any) => {
        if (res && res.id) {
          this.form = res
        }
      }, (error) => {
        let keys = Object.keys(error.error);
        this.errorMessage = error.error[keys[0]]
      })

  }
  onSubmit(): void {
    console.log(this.form);
    this.authService.editPost(this.form).subscribe(
      (res: any) => {
        if (res && res.id) {
          this.router.navigate(['home'])
        } else {
        }
      }, (error: any) => {                              //Error callback
        let keys = Object.keys(error.error);
        this.errorMessage = error.error[keys[0]]
      }
    )
  }
}
