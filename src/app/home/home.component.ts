import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router'

class DataTablesResponse {
  'data': [];
  'draw': number;
  'recordsFiltered': number;
  'recordsTotal': number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  posts:any=[];
  showCreatePost:any
  activeAdmin:any

  constructor(private authService:AuthService,private http:HttpClient,private router:Router) {}
objectToHttpParam(params: any, data: any, currentPath: string) {
  Object.keys(data).forEach(key => {
      if (data[key] instanceof Object) {
        if (currentPath !== '' ) {
          this.objectToHttpParam(params, data[key], `${currentPath}[${key}]`);
        } else {
          this.objectToHttpParam(params, data[key], `${currentPath}${key}`);
        }
      } else {
          if (currentPath !== '' ) {
            params[`${currentPath}[${key}]`] = data[key];
          } else {
            params[`${currentPath}${key}`] = data[key];
          }
      }
  });
}

  ngOnInit(): void {
    if(localStorage.getItem('role')){
      this.showCreatePost=localStorage.getItem('role')
    }else{
      this.showCreatePost=0
    }
    if(localStorage.getItem('active')){
      this.activeAdmin=localStorage.getItem('active')
    }else{
      this.activeAdmin=false
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback:any) => {
        const params = {};
        this.objectToHttpParam(params , dataTablesParameters , '');
        console.log(params);
        let token:any = 'Token '+localStorage.getItem('token');
        let headers = new HttpHeaders({
          "Authorization": token
        })
        this.http
          .get(
            'http://localhost:8000/api/posts/?format=datatables',
            {params:params, headers: headers}
          ).subscribe((resp:any) => {
            console.log(resp)
            this.posts = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'title' }, { data: 'description' },{data:'attachment'}],
    };
    // this.showCreatePost=localStorage.getItem('role')?localStorage.getItem('role'):0
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/signin'])
  }

}
