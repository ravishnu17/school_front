import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  token : any;

  constructor(private http: HttpClient ) { }
 
  baseUrl = "http://127.0.0.1:8000"
  // baseUrl = "https://school-python-api.herokuapp.com";

  login(data:any,url:any):Observable<any>{
    return this.http.post(this.baseUrl+url,data);
    
  }

  get(url :any):Observable<any>{  
    this.token =new HttpHeaders({"Authorization":localStorage.getItem('type')+" "+localStorage.getItem('token')});
    return this.http.get(this.baseUrl+url , {headers:this.token});
  }

  post(data:any,url:any){
    return this.http.post(this.baseUrl+url,data , {headers:this.token});
  }

  delete(url :any){
    return this.http.delete(this.baseUrl+url , {headers:this.token});
  }
}
