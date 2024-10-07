import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private viewPortScroller: ViewportScroller, private toastr: ToastrService) { }

  // navigateToHome() {
  //   this.router.navigate(['/']);
  // }

  navigateToLogIn() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  // navigateToDashboard() {
  //   this.router.navigate(['/dashboard']);
  // }

  // navigateToCourse() {
  //   this.router.navigate(['/course']);
  // }

  // navigateToAboutus() {
  //   this.router.navigate(['/about']);
  // }

  scrollToSection(section: string) {
    this.viewPortScroller.scrollToAnchor(section);
  }

  checkLogin() {
      this.toastr.warning('You have to login first');
      this.navigateToLogIn();
  }
  
}
