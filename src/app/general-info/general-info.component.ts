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

  formData!:FormGroup;
  changeForm!:FormGroup;
  recog!:FormGroup;
  data :any;
  name:any[0];
  count : any;
  constructor(private fb:FormBuilder , private service : SubserviceService , private route : Router) { }
  step=0;
  ngOnInit(): void {

    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['']);
    }


    this.formData = this.fb.group({
      name:[''],
      post:[''],
      district:[''],
      state:[''],
      ctv:[''],
      pincode:[''],
      url:[''],
      mail:[''],
      mobile:[''],
      type:[''],
      needs:[''],
      academic:[''],
      establish:[''],
      level:[''],
      medium:[''],
      affiliation:[''],
      t_staff:[''],
      gender:[''],
      girl:[''],
      boys:[''],
      total:[''],
      n_staff:[''],
      correspondent_name:[''],
      correspondent_mobile:[''],
      correspondent_mail:[''],
      principal_name:[''],
      principal_mail:[''],
      principal_office_mobile:[''],
      principal_mobile:[''],
      recognized:[''],
      board_name:[''],
      affiliate_number:[''],
      affiliate_year:[''],
      affiliate_type:[''],
      affiliate_state:[''],
      fire:[''],
      sanitation:[''],
      building:[''],
      minority:[''],
      own:[''],
      trust_name:[''],
      trust_register:[''],
      register_year:[''],
      register_no:[''],
      register_validity:[''],
      user_id:[]
    });

    this.changeForm = this.fb.group({
      username:[''],
      role:['']
    });
  }

  submit(){
    console.log(this.formData.value);
  }

  next(){
    this.step +=1;
  }

  previous(){
    this.step-=1;
  }

  change(){
    console.log(this.changeForm.value);
    this.service.post(this.changeForm.value , '/change').subscribe((arg:any) =>{
      console.log(arg);
      this.data = arg;
      alert(this.data.status)
    });
  }

  exit(){
    localStorage.clear();
    this.route.navigate(['']);
  }
  

}
