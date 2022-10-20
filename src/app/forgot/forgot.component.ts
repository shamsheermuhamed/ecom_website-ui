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
  confirmPassword:string;
  constructor(private router:Router, private loginService:LoginService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  changePassword(){
    let credential={username:this.user.username,password:this.user.password}
    console.log(credential.password+"hi");
    console.log(this.confirmPassword)
    if(credential.password!=this.confirmPassword){
      alert("Password and confirm password does not match");
    }
    else{
      this.loginService.changePassword(credential).subscribe(
        (response: any) => {
          alert(response.message);
          console.log(response);
          this.dialog.closeAll();
          // this.dialog.open(LoginComponent, {
          // });
        },
        (error)=>{
          alert(error.error.message);
        });
    }
  }

  signUp(){
    this.dialog.closeAll();
    this.router.navigate(['signup']);
  }

}
