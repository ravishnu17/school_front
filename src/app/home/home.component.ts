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
  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  data: any;
  type: any;
  name : any;
  page:any = 'Dashboard';
  constructor(private observer:BreakpointObserver ,private subservice:SubserviceService , private route:Router ,private act :ActivatedRoute) { }
 
  ngOnInit(): void {
    this.subservice.get('/get').subscribe(
      next =>{         
      this.data = next;
      this.type = this.data.role ;
      this.name = this.data.name ;      
    },
      error =>{
      this.route.navigate(['/']);
    });
    
    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['']);
    }
  }

  path(path:any , page:any){
    if(path ==''){
      localStorage.clear();
    }
    this.page=page;
    this.route.navigate([path]);
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