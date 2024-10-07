import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router:Router, private GoogleAuth:GoogleAuthService, private NetLearn:NetLearnService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.isPasswordStep = true;
    // GoogleAuthService will initialize Google login automatically
    
  }

  isPasswordStep: boolean = false;
  StudentName: string= '';
  Email: string = '';
  Password:any;
  
  // Method to handle the 'Register' button click
  onRegister() {
    this.NetLearn.signup(this.StudentName, this.Email,this.Password ).subscribe(
      response=>{
        this.toastr.success("Register Successfully", "Success");
        this.router.navigate(['/login']);
    },
    error => {
      this.toastr.error("Invalid User", 'Error');
    }
  )};

  

  navigateToLogIn(){
    this.router.navigate(['/login']);
  }
}
