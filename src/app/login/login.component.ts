import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare variables 
  // declare variables 
  username!: string;
  password!: string;
  message: any;

  constructor(private service: AuthserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  doLogin() {
    let resp = this.service.login(this.username, this.password);
    resp.subscribe(data => {
      this.message = data;
     this.router.navigate(["/home"])
    });
  }

}
