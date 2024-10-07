import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetLearnService } from '../../services/net-learn.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router, private NetLearn:NetLearnService, private toastr:ToastrService){}

  Email:string='';
  Password:string='';

  navigateToSignUp(){
    this.router.navigate(['/signup']);
  }

  navigateToHomepage(){
    this.router.navigate(['/']);
  }

  Signin(){
    this.NetLearn.login(this.Email, this.Password).subscribe((response)=>{
      this.toastr.success("Login Successful");
     sessionStorage.setItem('token',response.result.token);
      this.router.navigate(['/authenticated']);
    },
    (error)=>{
      this.toastr.error("invalid user");
    }
  );
  }
}
