import { Injectable } from '@angular/core';
import { MainserviceService } from './mainservice.service';

@Injectable({
  providedIn: 'root'
})
export class SubserviceService {

  constructor(private mainService: MainserviceService) { }

  post(data:any , path:any){
    return this.mainService.post(data,path); 
  }

  get(path:any){
    return this.mainService.get(path)
  }

  remove(){
    const path = "/delete";
    return  this.mainService.delete(path);
  }

  // getUser(){
  //   const path = '/getUser'
  //   return this.mainService.get(path)
  // }
}
