import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  apiUrl = 'http://localhost:8000/'

  register(data: any) {
    return this.http.post(this.apiUrl + 'register/', data, this.httpOptions)
  }

  registerAdmin(data: any) {
    return this.http.post(this.apiUrl + 'add-admin/', data, this.httpOptions)

  }

  login(data: any) {
    return this.http.post(this.apiUrl + 'login/', data, this.httpOptions)
  }

  getPosts() {
    this.httpOptions['headers'].append('Authorization', 'Token ' + localStorage.getItem('token'))
    return this.http.get(this.apiUrl + 'posts/', this.httpOptions)
  }

  createPost(data: any) {
    let headers = new HttpHeaders({
      "Authorization": 'Token ' + localStorage.getItem('token')
    })
    // this.httpOptions['headers'].append('Authorization','Token '+localStorage.getItem('token'))
    return this.http.post(this.apiUrl + 'add-post/', data, { headers })

  }
  getPost(id: String) {
    let headers = new HttpHeaders({
      "Authorization": 'Token ' + localStorage.getItem('token')
    })
    return this.http.get(this.apiUrl + 'post/' + id, {headers})
  }
  editPost(data: any) {
    let headers = new HttpHeaders({
      "Authorization": 'Token ' + localStorage.getItem('token')
    })
    // this.httpOptions['headers'].append('Authorization','Token '+localStorage.getItem('token'))
    return this.http.put(this.apiUrl + 'post/'+data.id, data, { headers })

  }
  updateAdmin(admin:any){
    let headers = new HttpHeaders({
      "Authorization": 'Token ' + localStorage.getItem('token')
    })
    // this.httpOptions['headers'].append('Authorization','Token '+localStorage.getItem('token'))
    return this.http.put(this.apiUrl + 'update-coadmin/'+admin.id, admin, { headers })

  }
}
