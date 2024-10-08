import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private toastr:ToastrService, private router:Router, private http:HttpClient) {
    this.loadGoogleScript();
  }

  // Load the Google Identity Services script dynamically
  loadGoogleScript(): void {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: '824202315196-1ed63a56rq759um91imipl62phm97rk1.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
      });

      // Render the Google Sign-In button inside the 'google-button' element
      google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'outline', size: 'large' }
      );
    };

    // Dynamically create and append the Google Identity script to the document
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => window.onGoogleLibraryLoad();
    document.body.appendChild(script);
  }

  // Handle the Google credential response
  handleCredentialResponse(response: any): void {
    console.log('Google ID Token:', response.credential);
   
    // Send the Google ID Token to the backend for verification
    const provider = 'google';
    this.http.post('http://localhost:4000/auth/socialLogin', { provider,accessToken: response.credential }).subscribe(
      (res: any) => {
        this.toastr.success("Login Successful", "Success");
        this.router.navigate(['/authenticated']); // Navigate to a protected page after login
        console.log("res.token:",res.token)
        sessionStorage.setItem('token',res.token);
      },
      (err: any) => {
        console.error('Google login error:', err);
        this.toastr.error("Login Failed", "Error");
      }
    );
  }
}