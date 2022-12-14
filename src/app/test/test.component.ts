import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SubserviceService } from '../subservice.service';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver}from '@angular/cdk/layout'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  age=20;
  name='ravi';
  dropdownList :any = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings = {};
  select = [{id:1 , data:'Ravi'}];
  form!:FormGroup;
  
  constructor(private observer:BreakpointObserver,private fb:FormBuilder , private subservice:SubserviceService) { }

  ngOnInit(): void {
    this.dropdownSettings={
      idField :'id',
      textField:'data'
    };
    this.dropdownList=[
      {id:1 , data:'Ravi'},
      {id:2,data:"Muni"}
    ];

    this.form = this.fb.group({
      personal:this.fb.group({
        name:[],
        age:[]
      }),
      education:this.fb.group({
        mark10:[]
      })

    })
  }
  change(name:any){
    console.log(name);
    
  }
  submit(){
    console.log(this.form.value);
    this.subservice.post(this.form.value,'/test').subscribe(data=>{
      console.log(data);
      
    });
    
  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width:900px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode ='side';
        this.sidenav.open();
      }
    });
  }
}
