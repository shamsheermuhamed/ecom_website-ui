import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/Ilogin';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { Users } from 'src/app/entity/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loadingEnable: boolean;
  sidenavEnable = false;
  user: Users;
  loggedIn=false;

  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }

  constructor(public dialog: MatDialog, private router: Router, 
    public loginService: LoginService,
    public loadingService: LoadingService) { }


  ngOnInit() {
    if(this.loginService.isLoggedIn()){
      this.loggedIn=true;
    }
  }


  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
    });
  }
  logout() {
    this.loginService.logout();
    this.loggedIn=false;
    window.location.href="/home";
  }
}
