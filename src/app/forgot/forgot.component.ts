import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../entity/user';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  user:Users=new Users
  constructor(private router:Router, private loginService:LoginService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  changePassword(){
    let credential={username:this.user.username,password:this.user.password}
    this.loginService.changePassword(credential).subscribe(
      (response: any) => {
        alert(response.message);
        console.log(response);
        this.dialog.closeAll();
        this.dialog.open(LoginComponent, {
        });
      },
      (error)=>{
        alert(error.error.message);
      });
  }

  signUp(){
    this.router.navigate(['signup']);
  }

}
