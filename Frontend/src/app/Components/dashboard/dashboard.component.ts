import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router:Router){}

  navigateToHome(){
    this.router.navigate(['/'])
  }

  navigateToLogIn(){
    this.router.navigate(['/login']);
  }

  navigateToSignUp(){
    this.router.navigate(['/signup']);
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  navigateToCourse(){
    this.router.navigate(['/course'])
  }

  navigateToAboutus(){
    this.router.navigate(['/about']);
   }
}
