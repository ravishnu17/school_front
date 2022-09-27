import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubserviceService } from '../subservice.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {

  changeForm!:FormGroup;
  data :any;
  name:any[0];
  count=0;
  constructor(private fb:FormBuilder , private service : SubserviceService , private route : Router) { }
  step=0;
  ngOnInit(): void {

    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Please Login again. Login Again!",'info');
      this.route.navigate(['']);
    }

    this.service.getUsers().subscribe(data=>{
      
      for (let val of data){
        if(val.role ==1){
          data[this.count]['role']="Admin";
        }else{
          data[this.count]['role']="User"
        }
        this.count +=1;
      }
      this.data = data;
    },error=>{
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['']);
    });

    this.changeForm = this.fb.group({
      username:[''],
      role:['']
    });
  }

  next(){
    this.step +=1;
  }

  previous(){
    this.step-=1;
  }

  change(){
    console.log(this.changeForm.value);
    this.service.changeRole(this.changeForm.value).subscribe((arg:any) =>{
      this.data = arg;
      alert(this.data.status);
      location.reload();
    });
  }

  exit(){
    localStorage.clear();
    this.route.navigate(['']);
  }
  
  delete(id:any,name:any){
    console.log(id);
    Swal.fire({
      title:'Click ok to confirm',
      text:'Are you sure to delete the user -'+name,
      icon:'question',
      showCancelButton:true,
      cancelButtonColor:'green',
      confirmButtonColor:'red'
      
    }).then((result) =>{
      if(result.isConfirmed){
        this.service.remove(id).subscribe(data=>{
          Swal.fire("Deleted successfully","","success");
          location.reload();
        });
      }
    });

    }

}
