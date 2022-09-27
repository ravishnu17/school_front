import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubserviceService } from '../subservice.service';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver}from '@angular/cdk/layout'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:any;
  constructor(private subservice:SubserviceService) { }
 
  ngOnInit(): void {
   this.subservice.getUser().subscribe(data=>{
    this.name = data.name;
    
   });
  }

}