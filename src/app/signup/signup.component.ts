import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../entity/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: Users= new Users

  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(private router: Router, private loginservice: LoginService) { }


  ngOnInit() {
    // if(sessionStorage.getItem('role') === 'customer' || sessionStorage.getItem('role') === 'admin') {
    //   this.router.navigate(['noauth']);
    // }
  }

  // Adds a new User
  signUp() {
    console.log(this.user);
    this.loginservice.signUp(this.user).subscribe(
      (response: any) => {
        console.log(response.message);
        alert(response.message)
        this.user=new Users;
      },
      error=>{
        alert(error.error.message);
      }
    );
    
    
  }

  // UserName Validations
  nameFlag: boolean= false;
  validateName() {
    var flag =  /^[a-zA-Z ]+$/.test(this.user.username);
    if(!flag) {
      this.nameFlag=true;
    }
    else {
      this.nameFlag=false;
    }
  }

  // UserPhone valdiations
  phoneFlag:boolean=false;
    validatePhone(){
        let phone=String(this.user.phone);
        if(phone.length!=10){
            this.phoneFlag=true;
        }else{
            this.phoneFlag=false;
        }
    }

    //UserfirstName Validation
    firstNameFlag:boolean=false;
    validatefirstName(){
        var flag=/^[a-zA-Z ]+$/.test(this.user.firstName);
        if(!flag){
            this.firstNameFlag=true;
        }else{
            this.firstNameFlag=false;
        }
    }
    //UserlastName Validation
    lastNameFlag:boolean=false;
    validatelastName(){
        var flag=/^[a-zA-Z ]+$/.test(this.user.lastName);
        if(!flag){
            this.lastNameFlag=true;
        }else{
            this.lastNameFlag=false;
        }
    }

    //UserEmail Validation
    emailFlag:boolean=false;
    validateEmail(){
        var flag=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email);
        if(!flag){
            this.emailFlag=true;
        }else{
            this.emailFlag=false;
        }
    }

    buttonFlag:boolean=true;
    enableButton(){
        this.buttonFlag=this.nameFlag||this.emailFlag||this.phoneFlag;
    }

}
