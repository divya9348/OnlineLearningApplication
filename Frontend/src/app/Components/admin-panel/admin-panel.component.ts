import { Component } from '@angular/core';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  course = {
    title: '',
    description: '',
    category: '',
    tags: '',
    tagsInput: '', // To store the raw input before splitting into array
   
  };
selectedImage:File |null=null;
  constructor(private netLearn: NetLearnService, private toastr: ToastrService) { } // Inject the service

  // Function to split tags input into an array of strings
  // processTags() {
  //   if (this.course.tagsInput) {
  //     this.course.tags = this.course.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  //   }
  // }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
  }
  // Submit course data
  createCourse() {

    const formData = new FormData(); // Use FormData to handle both text and file data
  
    formData.append('title', this.course.title);
    formData.append('description', this.course.description);
    formData.append('category', this.course.category);
    formData.append('tags', this.course.tags.split(',').map(tag => tag.trim()).join(',')); // Convert tags to a string
  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    // Process tags input before submitting the form
    // this.processTags();

    // if (!this.course.title || !this.course.description || !this.course.category || this.course.tags.length === 0) {
    //   console.log('Please fill in all fields');
    //   return;
    // }

    // Call the service method to create the course
    this.netLearn.createCourse(formData )
      .subscribe(

        (response) => {
          this.toastr.success("Course created successfully");
          this.loadCourses();
        },
        (error) => {
          this.toastr.error("Error creating course!!!");
          console.error('Error creating course:', error);
        }
      );
  }

  ngOnInit(): void {
    this.loadCourses();
    this.getEnrolledCourse();
  }

  courses: any[] = [];  // List of available courses
  enrolledCourses: any[] = [];  // List of enrolled courses

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

  currentCourseId: any = '';
  newLesson = {
    title: '',
    content: ''
  };

  isAddLessonVisible: boolean = false

  showAddLessonForm(course: any) {
    this.currentCourseId = course._id;
    this.isAddLessonVisible = true;
  }

  resetLessonForm() {

  }
  createLesson() {
    const lessonData = { ...this.newLesson };
    console.log("currentCourseId", this.currentCourseId);
    this.netLearn.createLesson(this.currentCourseId, lessonData).subscribe(
      (data) => {
        const courseIndex = this.courses.findIndex(course => course._id === this.currentCourseId);
        if (courseIndex !== -1) {
          this.courses[courseIndex].lessons.push(data.lesson);
        }
        this.isAddLessonVisible = false;
        this.resetLessonForm();
      },
      (error) => {
        console.error('Failed to create lesson', error);
      }
    );
  }

  newQuiz = { title: '', questions: [{ question: '', options: '', correctAnswer: '' }] };
  isAddQuizVisible = false;
  currentLessonId: string = '';

  showAddQuizForm(course: any) {
    this.currentCourseId = course;
    this.isAddQuizVisible = true;
  }

  // Function to add a new question field
  addAnotherQuestion() {
    this.newQuiz.questions.push({ question: '', options: '', correctAnswer: '' });
  }

  createquizes() {
    console.log("currentCourseId:", this.currentCourseId)
    const quizData = {
      courseId: this.currentCourseId._id,
      title: this.newQuiz.title,
      questions: this.newQuiz.questions.map(q => ({
        question: q.question,
        options: q.options.split(',').map(opt => opt.trim()), // Split and trim options
        correctAnswer: q.correctAnswer
      }))
    };

    this.netLearn.createQuiz(quizData).subscribe(
      () => {
        this.isAddQuizVisible = false;
        this.newQuiz = { title: '', questions: [{ question: '', options: '', correctAnswer: '' }] };
      },
      (error) => { console.error('Error creating quiz', error); }
    );
  }
}
