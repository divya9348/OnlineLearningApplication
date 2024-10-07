import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetLearnService } from '../../services/net-learn.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(private router:Router, private netLerarn:NetLearnService, private toastr:ToastrService){}
  contact={
    fullname:  '',
    email:  '',
    message:''
    }
  
  onSubmit() {
    this.netLerarn.contactus(this.contact.fullname, this.contact.email,this.contact.message ).subscribe(
      response=>{
        console.log(this.contact.fullname)
        console.log(this.contact.email)
        console.log(this.contact.message)
        this.toastr.success("Data Sent Successfully", "Success");
        this.router.navigate(['/login']);
    },
    error => {
      this.toastr.error("Something Went Wrong!!!", 'Error');
    }
  )};

}
