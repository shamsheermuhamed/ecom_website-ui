import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/Ilogin';
import { MatDialog } from '@angular/material';
import { ForgotComponent } from '../forgot/forgot.component';
import { Users } from '../entity/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users:Users=new Users;
  users1:Users=new Users;
  // loginForm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router, public dialog: MatDialog) {}

    ngOnInit() {
      
    }
    signIn(){
      let credential={username:this.users1.username,password:this.users1.password}
      this.loginService.generateToken(credential).subscribe(
        (response: any) => {
          console.log(response);
          this.loginService.loginUser(response.token);
          this.loginService.loginUserId(response.id);
          this.loginService.setRoles(response.roles);
          // this.dialogRef.close();
          window.location.href="/home";
        },
        (error:HttpErrorResponse)=>{
          // alert(error);
          if(error.status==401){
            alert("Invalid username or password")
          }
        });
    }

    openForgotDialog(): void {
      this.dialogRef.close();
      const dialogRef = this.dialog.open(ForgotComponent, {
      });
    }

  signUp(){
    this.dialogRef.close();
    this.router.navigate(['signup']);    
  }
}
