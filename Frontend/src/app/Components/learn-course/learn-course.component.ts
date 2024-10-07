import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-learn-course',
  templateUrl: './learn-course.component.html',
  styleUrl: './learn-course.component.scss'
})
export class LearnCourseComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router:Router, private netLearn:NetLearnService, private toastr:ToastrService){}
ngOnInit(){
  
  this.courseId = this.route.snapshot.paramMap.get('courseId') as string; // Get the course ID from the route
    this.loadCourseDetails(this.courseId);
    this.getQuizByCourse(this.courseId);
   
}
courseId: string = '';
courseDetails: any = {};
 

  // Function to load course details based on course ID
  loadCourseDetails(courseId: string): void {
    this.netLearn.getCourseById(courseId).subscribe(
      (response) => {
        this.courseDetails = response.data;
        this.toastr.success('Course details loaded successfully');
        this.getlessonbyId();
      },
      (error) => {
        this.toastr.error('Error loading course details');
        console.error('Error loading course details:', error);
      }
    );
  }

lessons:any[]=[];
title:string='';
content:string='';

  getlessonbyId(){
    this.netLearn.getlesson(this.courseId).subscribe(
      (response:any)=>{
       this.lessons= response.data;
       console.log("this.lesson:",response.data)
    });
  }

  course:any={}
  quizes:any[]=[];
  options:any;
  quiz:any;
  getQuizByCourse(courseId: string){

    this.netLearn.getCourseById(courseId).subscribe((response:any)=>{
      if(response.data.quizzes.length>0){
        this.quizes.push(...response.data.quizzes)
      }
      this.quiz=this.quizes[0];
      console.log("this.quizes:",this.quizes)
    });
  }

  SelectedAnswers:{[key:string]:string}={}
  submitQuiz(){
    const answers=Object.values(this.SelectedAnswers);
    this.netLearn.submitQuiz(this.quiz._id,{answers}).subscribe(()=>{
      this.toastr.success("Quiz Submited Successfully");
    });
  }


  selectAnswer(questionId: string, answer: string) {
    this.SelectedAnswers[questionId] = answer; // Store the selected answer for the question
  }
}
