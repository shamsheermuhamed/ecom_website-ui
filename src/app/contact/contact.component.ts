import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  firstName:string;
  email:string;
  description:string;

  emailFlag:boolean=false;
  validateEmail(){
      var flag=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
      if(!flag){
          this.emailFlag=true;
      }else{
          this.emailFlag=false;
      }
  }

  //UserfirstName Validation
  firstNameFlag:boolean=false;
  validatefirstName(){
      var flag=/^[a-zA-Z ]+$/.test(this.firstName);
      if(!flag){
          this.firstNameFlag=true;
      }else{
          this.firstNameFlag=false;
      }
  }

  buttonFlag:boolean=true;
    enableButton(){
        this.buttonFlag=this.emailFlag||this.firstNameFlag;
    }

    submitFeedback(){
      alert("Thanks for contacting us. Will reply back to you soon")
      this.description="";
      this.email="";
      this.firstName="";
    }

}
