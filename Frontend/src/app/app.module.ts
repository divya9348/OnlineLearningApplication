import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginOtpComponent } from './Components/login-otp/login-otp.component';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { CourseComponent } from './Components/course/course.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { ToastrModule } from 'ngx-toastr';
import { AfterLoginComponent } from './Components/after-login/after-login.component';
import { LearnCourseComponent } from './Components/learn-course/learn-course.component';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginOtpComponent,
    LoginComponent,
    HomepageComponent,
    CourseComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    AfterLoginComponent,
    LearnCourseComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Import BrowserAnimationsModule
    ToastrModule.forRoot({timeOut:3000,positionClass:'toast-top-right'}),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
