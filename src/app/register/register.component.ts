import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private fb1:FormBuilder,private subService:SubserviceService,private route:Router) { }
  
  ngOnInit(): void {
    this.registerForm=this.fb1.group({
      name:[''],
      dob:[''],
      gender:[''],
      mobile:['',[Validators.minLength(10),Validators.maxLength(10)]],
      email:['',Validators.required],
      username:[''],
      password:['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')],
      district:['']

    })
  }
  submit(){
    if(this.registerForm.invalid){
      alert("Field should not be Empty")
    }
    else{
      this.subService.post(this.registerForm.value ,'/register').subscribe((arg:any) => {
        this.data=arg;
        console.log(arg);
        
        if(this.data.status != null){
          alert("Registered Successfully Continue to login ");
          this.route.navigateByUrl('');
        }
        else{
          this.error=this.data.msg;
        }
      })
    }
    
  }

}
