import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubserviceService } from '../subservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  data : any;
  error:any;
  submitted=false
  constructor(private fb1:FormBuilder,private subService:SubserviceService,private route:Router) { }
  
  ngOnInit(): void {
    this.registerForm=this.fb1.group({
      name:[''],
      dob:[''],
      gender:[''],
      mobile:['',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      email:['',[Validators.required,Validators.email]],
      username:[''],
      password:['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')],
      district:['']

    })
  }
  submit(){
    if(this.registerForm.invalid){
      this.submitted = true
    }
    else{
      
      this.subService.register(this.registerForm.value).subscribe((arg:any) => {
        this.data=arg;
        
        if(this.data.email == this.registerForm.controls['email'].value){
          Swal.fire({
            title:"Registered successfully !",
            text:'Continue to login',
            icon:'success',
            timer:1000,
            position:'center',
            showConfirmButton:false,
          });
          this.route.navigateByUrl('');
        }
      },error=>{
        console.log(error);
        
        this.error = error.error.detail;
      })
    }
    
  }

}
