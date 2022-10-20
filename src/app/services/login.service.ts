import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users:Users=new Users;
  loggedIn = new BehaviorSubject(this.users);
  constructor(private httpClient: HttpClient) { }

  signUp(user: Users) { 
    user.roles=["user"];
    return this.httpClient.post("http://localhost:8090/api/auth/signup", user);
  }

  changePassword(credential:any) { 
    console.log("service"+ credential.username+ credential.password)
    return this.httpClient.put("http://localhost:8090/api/auth/forgot", credential);
  }

  generateToken(credential:any){
    return this.httpClient.post("http://localhost:8090/api/auth/signin",credential)
  }

  loginUser(token:any){
    localStorage.setItem("token",token);
  }

  loginUserId(id:any)
  {
    localStorage.setItem("id",id)
    console.log(localStorage.getItem("id"))
  }
  isLoggedIn()
  {
    let token= localStorage.getItem("token");
    if(token==undefined || token==='' ||token==null)
    {
      return false;
    }
    else{
      return true;
    }
  }

  getToken(){
    return localStorage.getItem("token");
  }

  setRoles(roles:any){
    localStorage.setItem("roles",roles)
  }

  getRoles(){
    console.log(localStorage.getItem("roles"));
    return localStorage.getItem("roles");
    
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
    return true;
  }

  getUserId(){
    return localStorage.getItem("id");
  }

}