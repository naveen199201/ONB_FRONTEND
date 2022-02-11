import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  admins: any = [];
  showCreatePost: any

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
  objectToHttpParam(params: any, data: any, currentPath: string) {
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Object) {
        if (currentPath !== '') {
          this.objectToHttpParam(params, data[key], `${currentPath}[${key}]`);
        } else {
          this.objectToHttpParam(params, data[key], `${currentPath}${key}`);
        }
      } else {
        if (currentPath !== '') {
          params[`${currentPath}[${key}]`] = data[key];
        } else {
          params[`${currentPath}${key}`] = data[key];
        }
      }
    });
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        const params = {};
        this.objectToHttpParam(params, dataTablesParameters, '');
        console.log(params);
        let token: any = 'Token ' + localStorage.getItem('token');
        let headers = new HttpHeaders({
          "Authorization": token
        })
        this.http
          .get(
            'http://localhost:8000/api/co-admins?format=datatables',
            { params: params, headers: headers }
          ).subscribe((resp: any) => {
            console.log(resp)
            this.admins = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'first_name' }, { data: 'last_name' }, { data: 'email' }, { data: 'is_staff' }],
    };
  }

  approve(admin: any) {
    admin.is_staff == true ? admin.is_staff = false : admin.is_staff = true
    this.authService.updateAdmin(admin).subscribe(
      (res: any) => {
        // if(res.success)

      }, (error: any) => {

      }
    )
  }

}
