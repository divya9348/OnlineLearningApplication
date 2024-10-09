import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

// Custom validator function
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  const minLength = 4;
  const maxLength = 8;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  if (password.length < minLength || password.length > maxLength) {
    return { length: true }; // Invalid length
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return { complexity: true }; // Missing complexity
  }

  if (hasSpecialChar) {
    return { specialChar: true }; // Special characters not allowed
  }

  return null; // Valid password
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private GoogleAuth: GoogleAuthService,
    private NetLearn: NetLearnService,
    private toastr: ToastrService,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the FormGroup with validation
    this.signupForm = this.fb.group({
      StudentName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, passwordValidator]] // Add custom password validator
    });
  }

  ngOnInit(): void {
    this.isPasswordStep = true;
    // GoogleAuthService will initialize Google login automatically
  }

  isPasswordStep: boolean = false;

  // Method to handle the 'Register' button click
  onRegister() {
    if (this.signupForm.valid) {
      const { StudentName, Email, Password } = this.signupForm.value;
      this.NetLearn.signup(StudentName, Email, Password).subscribe(
        response => {
          this.toastr.success("Registered Successfully", "Success");
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error("Invalid User", 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields with valid data', 'Error');
    }
  }

  navigateToLogIn() {
    this.router.navigate(['/login']);
  }
}
