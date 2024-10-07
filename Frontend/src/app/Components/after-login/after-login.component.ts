import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NetLearnService } from '../../services/net-learn.service';
import { response } from 'express';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.scss'
})
export class AfterLoginComponent {

  constructor(private router: Router, private viewPortScroller: ViewportScroller, private toastr: ToastrService, private netLearn: NetLearnService) { }
  title: string = "";
  description: string = "";
  category: string = "";
  tags: string = "";
  courses: any[] = [];  // List of available courses
  enrolledCourses: any[] = [];  // List of enrolled courses

  userName: string = '';
  profileData: any = {
    name: '',
    email: '',
    bio: '',
    role: ''
  }

  ngOnInit() {
    this.getUserProfile();
  }

  // Fetch all available courses
  loadCourses() {
    this.netLearn.getAllCourse().subscribe(
      response => {
        this.courses = response.courses;
      },
      error => {
        this.toastr.error('Error loading courses', 'Error');
      }
    );
  }

  //userProfile get
  getUserProfile(): void {
    this.netLearn.getUserProfile().subscribe({
      next: (res) => {
        console.log("res:",res);
        this.userName = res.user.StudentName;
        this.profileData = res.user;
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      }
    });
  }

  userDropDownVisible:boolean=false;
  userDropdown(){
    this.userDropDownVisible= !this.userDropDownVisible;
  }

  // Load enrolled courses
  loadEnrolledCourses() {
    this.netLearn.getEnrolledCourses().subscribe(
      response => {
        this.enrolledCourses = response.enrolledCourses;
      },
      error => {
        this.toastr.error('Error loading enrolled courses', 'Error');
      }
    );
  }

  // Learn a course (navigate to course content)
  learnCourse(courseId: string) {
    this.router.navigate([`/learn/${courseId}`]);
  }

  scrollToSection(section: string) {
    this.viewPortScroller.scrollToAnchor(section);
  }
  navigateToSignIn(){
    this.router.navigate(['/login'])
  }

}
