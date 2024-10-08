import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginOtpComponent } from './Components/login-otp/login-otp.component';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { CourseComponent } from './Components/course/course.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AfterLoginComponent } from './Components/after-login/after-login.component';
import { LearnCourseComponent } from './Components/learn-course/learn-course.component';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { authGuardGuard } from './Guard/auth-guard.guard';

const routes: Routes = [
  {path:"", component:HomepageComponent},  //homepage route...
  {path:"course",component:CourseComponent},
  { path: 'learn/:courseId', component: LearnCourseComponent },
  {path:'TheAdmin',component:AdminPanelComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"about", component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"authenticated", component:AfterLoginComponent,canActivate:[authGuardGuard]},
  {path:"loginotp", component:LoginOtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
