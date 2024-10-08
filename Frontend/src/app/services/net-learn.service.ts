import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NetLearnService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:4000";

  //CollectToken
  getToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return headers;
  }

  //SignupUser
  signup(StudentName: string, Email: string, Password: string) {
    return this.http.post<any>(`${this.apiUrl}/student/signup`, { StudentName, Email, Password });
  }

  //Login user
  login(Email: string, Password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { Email, Password });
  }

  //createCourse
  createCourse(courseData:FormData): Observable<any> {
    const headers = this.getToken();
    return this.http.post<any>(`${this.apiUrl}/courses/create`, courseData, { headers });
  }

  //getAllCourse
  getAllCourse() {
    // const headers = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/courses`);
  }

  // Enroll in a course
  enrollInCourse(courseId: string): Observable<any> {
    const headers = this.getToken();
    return this.http.post<any>(`${this.apiUrl}/courses/enroll/${courseId}`, {}, { headers });
  }

  // Get all enrolled courses
  getEnrolledCourses(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/courses/enrolled`, { headers });
  }

  //getCourseBy Id
  getCourseById(courseId: string): Observable<any> {
    const headers = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}`, { headers });
  }

  //getUserProfile
  getUserProfile(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/auth/user/profile`, { headers });
  }

  //contactUs
  contactus(fullname: string, email: string, message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/contactus`, { fullname, email, message });
  }

  //SearchByCategory
  searchByCategory(category:string){
    const headers = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/courses/category/${category}`,{headers})
  }

  createLesson( courseId: string, lessonData:any){
    const headers = this.getToken();
    console.log("Lesson data:",lessonData);
    return this.http.post<any>(`${this.apiUrl}/lessons/create/${courseId}`,lessonData,{headers})
  }

  getlesson(courseId:string){
    const headers = this.getToken();
    return this.http.get(`${this.apiUrl}/lessons/${courseId}`, { headers });
    }

  createQuiz(quizData:any){
    const headers=this.getToken();
    return this.http.post<any>(`${this.apiUrl}/quizes/create`,{quizData},{headers})
  }

  submitQuiz( quizId: any,  data: { answers: string[] }): Observable<any> {
    const headers = this.getToken();
    return this.http.post<any>(`${this.apiUrl}/quizes/submit/${quizId}`,data, { headers });
  }
}
