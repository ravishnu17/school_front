import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubserviceService } from '../subservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  loginForm!: FormGroup;
  data: any;
  error : any;
  form!: FormData;
  step=0;
  constructor(private fb: FormBuilder, private subService: SubserviceService,private route:Router) { 
  }

  ngOnInit(): void {

    localStorage.clear();
    
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: [''],
      pin:[],
      pwd:[]
    });
  }

  plus()
  {
    this.error = null;
    this.step=1;
  }

  minus()
  {
    this.error = null;
    this.step=0;
  }

//get pin method
  check(){    
    this.subService.post({"username":this.loginForm.controls['username'].value},'/pinGenerate').subscribe(data=>{
      this.data = data;      
      
      if (this.data[0].pin!=null){
        this.error=null;
        alert('Your pin is: '+this.data[0].pin)
      }
    },error=>{
      this.error = error.error.detail;
    });
  }

//forgot password method
  forgotPwd(){
    if (this.loginForm.controls['username'].value ==null || this.loginForm.controls['pin'].value==null || this.loginForm.controls['pwd'].value ==null) {
      alert("Field should not be Empty");
    }
    else{
      this.subService.post(this.loginForm.value,'/forgotPwd').subscribe(data=>{
        this.data = data;
        Swal.fire({
          title:'Successfully changed',
          icon:'success',
          confirmButtonColor:'blue',
        }).then((response)=>{
          if(response.isConfirmed){
            location.reload();
          }else{
            location.reload();
          }
        });
      },error =>{
        this.data = error;
        this.error = this.data.error.detail;
        // console.log(this.data , this.error);
        
      });
    }
  }

//login method
  submit() {

    if (this.loginForm.invalid) {      
      this.error="Enter login credentials";
    }
    else if(this.loginForm.controls['password'].value == ''){
      this.error="Enter login credentials";
    } 
    else {
        // const login = JSON.parse(JSON.stringify(this.loginForm.value))
        // console.log("login data",this.loginForm.value)

        this.form = new FormData();
        this.form.append("username",this.loginForm.controls['username'].value);
        this.form.append("password",this.loginForm.controls['password'].value);

      this.subService.post(this.form , '/login').subscribe( next => {
        this.data=next;

        if(this.data.access_token != null && this.data.role != 2 ){ 
          localStorage.setItem('token',this.data.access_token);
          localStorage.setItem('type',this.data.token_type); 

          // console.log("login token",localStorage.getItem('token'));
          Swal.fire({
            title:"Login successfully",
            showConfirmButton:false,
            icon:'success',
            timer:1000
          });
          this.route.navigate(['/main']);
          }
          else if (this.data.role == 2){
            localStorage.setItem('token',this.data.access_token);
            localStorage.setItem('type',this.data.token_type); 
            this.route.navigate(['/general']);
          }
      },error =>{
        this.error = error.error.detail;
        
      });      
    }
  }
}