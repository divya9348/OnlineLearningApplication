import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  constructor(private router: Router, private netLearn: NetLearnService, private toastr: ToastrService) { }
  category: string = '';
  courses: any[] = [];  // List of available courses
  enrolledCourses: any[] = [];  // List of enrolled courses

  ngOnInit(): void {
    this.loadCourses();
    this.getEnrolledCourse();
  }

  loadCourses() {
    this.netLearn.getAllCourse().subscribe(
      (response) => {
        this.courses = response.data; // Assign the response to courses array
        this.toastr.success("Load courses");
      },
      (error) => {
        console.error("Error loading courses", error);
        this.toastr.error("Failed to load courses");
      }

    );
  }

  getEnrolledCourse() {
    this.netLearn.getEnrolledCourses().subscribe(
      (response) => {
        this.enrolledCourses = response.enrolledCourses;
      },
      (error) => {
        console.error("Error loading courses", error);
        this.toastr.error("Failed to load courses");
      }
    );
  }

  // Enroll in a course
  enroll(courseId: string) {
    this.netLearn.enrollInCourse(courseId).subscribe(
      (response) => {
        if (response.alreadyEnrolled) {
          this.toastr.warning("You are already enrolled in this course");
        } else {
          this.getEnrolledCourse();
          this.toastr.success("Successfully enrolled in the course!");
        }
      },
      (error) => {
        console.error("Enrollment error", error);
        this.toastr.error("Failed to enroll in the course");
      }
    );
  }

  // Learn a course (navigate to course content)
  learnCourse(courseId: string) {
    this.router.navigate([`/learn/${courseId}`]);
  }
 
  navigateToHome() {
    this.router.navigate(['/'])
  }

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
    this.router.navigate(['/course'])
  }

  navigateToAboutus() {
    this.router.navigate(['/about']);
  }

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
