import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  age=20;
  name='ravi';
  dropdownList :any = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings = {};
  select = [{id:1 , data:'Ravi'}];
  form!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.dropdownSettings={
      idField :'id',
      textField:'data'
    };
    this.dropdownList=[
      {id:1 , data:'Ravi'},
      {id:2,data:"Muni"}
    ];
  }
  change(name:any){
    console.log(name);
    
  }
}
