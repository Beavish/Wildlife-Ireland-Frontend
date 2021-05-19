import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

login(username:string,password:string){
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
  const data = {
    "username":username,
    "password":password
  }
  return this.http.post("http://localhost:8080/login",{headers,data,responseType: 'text' as 'json'})
  }
}