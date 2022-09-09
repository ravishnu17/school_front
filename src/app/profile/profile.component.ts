import { Component, OnInit } from '@angular/core';
import { SubserviceService } from '../subservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data :any;
  profileForm! :FormGroup;
  type: any;
  role!: string;
  step!:number;
  pwd :any;
  del : any;
  status !:number;
  constructor(private location:Location, private subService : SubserviceService, private actRoute:ActivatedRoute,private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    
    // this.id = this.actRoute.snapshot.params["id"];
    // this.type = this.actRoute.snapshot.params["type"];
    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['']);
    }


    this.subService.get('/profile').subscribe(arg =>{
      this.data=arg
      console.log(this.data);
      this.type = this.data.role;

      if(this.data.role == 0){
        this.role = "User";
      }
      else if (this.data.role == 1){
        this.role ="Admin"
      }
      
      this.loadData();
      
    },error =>{
      this.route.navigate(['/'])
    });
    
    this.profileForm=this.fb.group({
      name:[''],
      dob:[''],
      gender:[''],
      mobile:[''],
      email:[''],
      username:[''],
      district:[''],
      oldPwd:[''],
      newPwd:['']
    });

  }
  
  loadData(){  
    this.profileForm=this.fb.group({
    name:[this.data.name],
    dob:[this.data.dob],      
    gender:[this.data.gender],
    mobile:[this.data.mobile],
    email:[this.data.email],
    username:[this.data.username],
    district:[this.data.district],
    oldPwd:[''],
      newPwd:['']
    })
  }

  submit(){
    this.subService.post(this.profileForm.value , '/profileUpdate').subscribe(arg =>{
        this.data=arg;
        if(this.data.msg != null){
          Swal.fire("",this.data.msg,"warning");
        }
        else{
          Swal.fire({
            position:'top',
            text:'Your profile updated successfully',
            icon:'success'
          });
        }
    })
    
  }

  change(){
    this.step=1;
  }
  update(){
    console.log(this.profileForm.value);

    this.subService.post(this.profileForm.value , '/pwd').subscribe(arg=>{
      this.pwd = arg;
      console.log(this.pwd);
      this.status = this.pwd.status ; 
    });
  }
  remove(){
    Swal.fire({
      title:"Please confirm",
      text:"Are you sure to delete your Account ?",
      showConfirmButton:true,
      showCancelButton:true,
      confirmButtonText:"Sure",
      cancelButtonText:'Cancel',
      confirmButtonColor:'green',
      cancelButtonColor:'red',
      position:"top",
    }).then((result)=>{
      if(result.isConfirmed){
        this.subService.remove().subscribe(arg=>{
          this.del =arg;
          console.log(this.del);
        if(this.del.detail != null){
          Swal.fire("Account Deleted successfully !","success");
          this.route.navigate(['/']);
        }
        });
      }
    });
  }
  previous(){
    this.step-=1;
  }
  showProfile(path:any){
    if (path ==''){
      localStorage.clear();  
    }
    this.route.navigate([path])
  }
}
