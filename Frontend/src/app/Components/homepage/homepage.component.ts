import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { ViewportScroller } from '@angular/common';
import { NetLearnService } from '../../services/net-learn.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private viewPortScroller: ViewportScroller, private toastr: ToastrService, private netLearn:NetLearnService) { }

  // navigateToHome() {
  //   this.router.navigate(['/']);
  // }

  navigateToLogIn() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToCourse() {
    this.router.navigate(['/course']);
  }

  navigateToAboutus() {
    this.router.navigate(['/about']);
  }
ngOnInit(){
  this.loadCourses();
}

  courses: any[] = [];  // List of available courses
  loadCourses() {
    this.netLearn.getAllCourse().subscribe(
      response => {
        this.courses = response.data;
        console.log("this.courses:",response.data);
      },
      error => {
        this.toastr.error('Error loading courses', 'Error');
      }
    );
  }


  scrollToSection(section: string) {
    this.viewPortScroller.scrollToAnchor(section);
  }

  checkLogin() {
      this.toastr.warning('You have to login first');
      this.navigateToLogIn();
  }

  category: string = '';
  Category(category: string) {
    if (category) {
      // Decode any URL encoding, just in case it's applied (like %20 for spaces)
      const decodedCategory = decodeURIComponent(category);
      console.log("decodedCategory:",decodedCategory)
      this.netLearn.searchByCategory(decodedCategory).subscribe(
        (response) => {
          this.courses = response.courses; // Update the courses list with filtered results
          this.toastr.success(`Courses loaded for ${decodedCategory}`);
        },
        (error) => {
          console.error("Error fetching courses by category", error);
          this.toastr.error(`Failed to load courses for ${decodedCategory}`);
        }
      );
    }
  }
  
}
