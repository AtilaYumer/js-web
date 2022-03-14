import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor() { 
    if(sessionStorage.getItem('isLogin')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    this.isLogin = true;
    sessionStorage.setItem('isLogin', 'true');
  }

  logout(): void {
    this.isLogin = false;
    sessionStorage.removeItem('isLogin');
  }

}
