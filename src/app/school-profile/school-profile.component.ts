import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup,FormArray ,Validators } from '@angular/forms';
import { SubserviceService } from '../subservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css']
})
export class SchoolProfileComponent implements OnInit {
  id: any;
  status :any;
  type : any;
  get : any;
  step=1;
  count=1;
  page = new Array(20);
  dataForm! : FormGroup;
  
  selected:any=[];
  medium:any=[];
  schoolLevel :any=[];
  dropdownSetting : IDropdownSettings={};

  constructor(private fb : FormBuilder , private subService : SubserviceService ,private route : Router) { }
  
  ngOnInit(): void {

    
    if(localStorage.getItem('token')==null){
      Swal.fire("Closed","Your Session is ended. Login Again!",'info');
      this.route.navigate(['']);
    }

    this.dropdownSetting={
      idField:"id",textField:'text'
    }

    this.schoolLevel=[
      {id:1 , text:'Foundation(PreKG to II)'},
      {id:2 , text:'Preparatory(std III to std V'},
      {id:3 , text:'Middle(VI to VIII)'},
      {id:4 , text:'Secondary(VI - X)'},
      {id:5 , text:'Higher Secondary(VI to XII)'},
      {id:6 , text:'Primary X'},
    ];

    this.dropdownSetting={
      idField:"id",textField:'text'
    }

    this.medium=[
      {id:1 , text:'Tamil'},
      {id:2 , text:'English'},
      {id:3 , text:'Telugu'},
      {id:4 , text:'Hindi'},
      {id:5 , text:'Malayalam'},
      {id:6 , text:'Kannada'},
    ];

    this.dataForm = this.fb.group({
      name:[],
      post:[] ,
      district:[],
      state:[],
      ctv:[],
      pincode:['',[Validators.pattern("^[0-6]*$"),Validators.minLength(6),Validators.maxLength(6)]],
      url:[],
      mail:[,[Validators.email]],  
      mobile:[,[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      type:[,[Validators.required]],
      needs:[],
      academic:[,[Validators.required]],
      establish:[],
      level:[,[Validators.required]],
      medium:[,[Validators.required]],
      affiliation:[,[Validators.required]],
      t_staff:[],
      gender:[,[Validators.required]],
      girl:[],
      boys:[],
      total:[],
      n_staff:[],
      correspondent_name:[],
      correspondent_mobile:[,[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      correspondent_mail:[,[Validators.email]],
      principal_name:[],
      principal_mail:[,[Validators.email]],
      principal_office_mobile:[,[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      principal_mobile:[,[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      recognized:[],
      board_name:[,[Validators.required]],
      affiliate_number:[],
      affiliate_year:[],
      affiliate_type:[,[Validators.required]],
      affiliate_state:[],
      christian:[],
      hindu:[],
      islam:[],
      others:[],
      nonBeliver:[],
      fire:[,[Validators.required]],
      sanitation:[,[Validators.required]],
      building:[,[Validators.required]],
      minority:[,[Validators.required]],
      own:[,[Validators.required]],
      trust_name:[],
      trust_register:[,[Validators.required]],
      register_act:[],
      register_year:[],
      register_no:[],
      register_validity:[],
      president_name:[],
      president_designation:[],
      president_address:[],
      president_number:[,[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      president_email:[,[Validators.email]],
      gover_trust:[,[Validators.required]],
      gover_member:[],
      gover_tenure:[],
      educative:[,[Validators.required]],
      educative_member:[],
      educative_tenure:[],
      pta:[,[Validators.required]],
      pta_member:[],
      pta_tenure:[],
      student_council:[,[Validators.required]],
      student_member:[],
      student_tenure:[],
      general_complaint:[,[Validators.required]],
      school_commit:[,[Validators.required]],
      constitution_commit:[,[Validators.required]],
      constitution_member:[],
      constitution_tenure:[],
      school_building:[,[Validators.required]],
      schoolArea:[],
      schoolBuilt:[],
      groundArea:[],
      noBuilding:[],
      provision:[],
      noStaircase:[],
      lift:[],
      classRoom:[],
      staffRoom:[],
      physicalLab:[],
      chemistryLab:[],
      biologylab:[],
      mathsLab:[],
      science:[],
      library:[],
      auditorium:[],
      counselor:[],
      parlor:[],
      prayer:[],
      sick:[],
      canteen:[],
      security:[],
      otherRoom:[],
      staffToilets:[],
      studToilet:[],
      teacher:[],
      boundry:[,[Validators.required]],
      boundry_wall:[],
      cctv:[,[Validators.required]],
      dataSave:[,[Validators.required]],
      camera:[],
      maleGuard:[,[Validators.required]],
      noMaleGuard:[],
      femaleGuard:[,[Validators.required]],
      noFemaleGuard:[],
      drinkWater:[,[Validators.required]],
      drainage:[,[Validators.required]],
      midday:[],
      nobus:[],
      gps:[],
      noladyAttend:[],
      firstAid:[],
      noDrinkWater:[],
      BusContract:[],
      buspass:[],
      freeTransport:[],
      library_open:[],
      library_close:[],
      noBook:[],
      magazine:[],
      noNews:[],
      noEbook:[],
      primaryLibrary:[],
      remedial:[],
      tv:[],
      digitalboard:[],
      computer:[],
      projector:[],
      tape:[],
      ppm:[],
      ppf:[],
      tpm:[],
      tpf:[],
      pvm:[],
      pvf:[],
      tvm:[],
      tvf:[],
      ppgtm:[],
      ppgtf:[],
      tpgtm:[],
      tpgtf:[],
      ptgtm:[],
      ptgtf:[],
      ttgtm:[],
      ttgtf:[],
      pprtm:[],
      pprtf:[],
      tprtm:[],
      tprtf:[],
      pnttm:[],
      pnttf:[],
      tnttm:[],
      tnttf:[],
      putm:[],
      putf:[],
      tutm:[],
      tutf:[],
      plm:[],
      plf:[],
      tlm:[],
      tlf:[],
      pmtm:[],
      pmtf:[],
      tmtm:[],
      tmtf:[],
      pctm:[],
      pctf:[],
      tctm:[],
      tctf:[],
      pcltm:[],
      pcltf:[],
      tcltm:[],
      tcltf:[],
      pfmm:[],
      pfmf:[],
      tfmm:[],
      tfmf:[],
      pnm:[],
      pnf:[],
      tnm:[],
      tnf:[],
      pptm:[],
      pptf:[],
      tptm:[],
      tptf:[],
      pom:[],
      tom:[],
      ptom:[],
      poa:[],
      toa:[],
      ptoa:[],
      pc:[],
      tc:[],
      ptc:[],
      pla:[],
      tla:[],
      ptla:[],
      pa:[],
      ta:[],
      ptac:[],
      ppc:[],
      tpc:[],
      ptpc:[],
      po:[],
      to:[],
      pto:[],
      no_of_act:[],
      no_of_group:[],
      no_of_service:[],
      school_sports:[],
      zonal_sports:[],
      district_sports:[],
      state_sports:[],
      national_sports:[],
      international_sports:[],
      school_compet:[],
      zonal_compet:[],
      district_compet:[],
      state_compet:[],
      national_compet:[],
      international_compet:[],
      school_program:[],
      zonal_program:[],
      district_program:[],
      state_program:[],
      national_program:[],
      international_program:[],
      school_history:[],
      school_plan:[],
      academic_begin_month:[],
      academic_end_month:[],
      no_of_work_2021:[],
      no_of_work_2020:[],
      no_of_work_2019:[],
      no_of_hour_2021:[],
      no_of_hour_2020:[],
      no_of_hour_2019:[],
      no_of_totalhour_2021:[],
      no_of_totalhour_2020:[],
      no_of_totalhour_2019:[],
      no_of_dayStaff_2021:[],
      no_of_dayStaff_2020:[],
      no_of_dayStaff_2019:[],
      no_of_holiday_2021:[],
      no_of_holiday_2020:[],
      no_of_holiday_2019:[],
      no_of_subject:[],
      no_of_moral:[],
      teach_time:[],
      no_of_activity:[],
      from_summer_time:[],
      to_summer_time:[],
      from_winter_time:[],
      to_winter_time:[],
      school_shift:[],
      scholarship:this.fb.array([]),
      shift:this.fb.array([]),
      schoolClass:this.fb.array([])
    });

    this.subService.get('/SchoolProfile').subscribe(arg=>{
      
      for(let val of arg.level){
        this.selected.push({id:Number(val[0]),text:val[1]});
      }
      arg.level = this.selected;

      this.selected=[];
      for (let val of arg.medium){
        this.selected.push({id:Number(val[0]),text:val[1]})
      }
      arg.medium =this.selected;
      
      this.dataForm.patchValue(arg);
      
      this.get=arg.scholarship;
      for (let data of this.get){         
        this.Scholarship().push(this.loadScholarship(data));
      }

      this.get = arg.shift;
      for(let data of this.get){
        this.Shift().push(this.loadShift(data));
      }

      this.get = arg.schoolClass;
      for(let data of this.get){
        this.Schoolclass().push(this.loadClass(data));
      }
      
      
    },
    error =>{
      Swal.fire({
        title:'Session ended !',
        text:"login Again...",
        icon:'warning',
        position:'center',
        confirmButtonColor:'blue',
      })
      this.route.navigate(['/'])
    });
    
  }

  loadScholarship(data:any):FormGroup{
    return this.fb.group({
      scholarshipName:[data[0]],
      scholarshipBoys:[data[1]],
      scholarshipGirls:[data[2]],
      Govtscholarship:[data[3]],
      Pvtscholarship:[data[4]],
    });
  }

  newScholarship():FormGroup{
    return this.fb.group({
      scholarshipName:[],
      scholarshipBoys:[],
      scholarshipGirls:[],
      Govtscholarship:[],
      Pvtscholarship:[],
    });
  }

  Scholarship():FormArray{
    return this.dataForm.get('scholarship') as FormArray;
  }

  addScholarship(){
    this.Scholarship().push(this.newScholarship());
    
  }

  removeScholarship(i:any){
    this.Scholarship().removeAt(i)
  } 

  loadShift(data:any):FormGroup{
    return this.fb.group({
      shiftName:[data[0]],
      shiftFromDate:[data[1]],
      shiftToDate:[data[2]],
      shiftFromTime:[data[3]],
      shiftToTime:[data[4]],
      shiftRemark:[data[5]]
    });
  }
  
  newShift():FormGroup{
    return this.fb.group({
      shiftName:[],
      shiftFromDate:[],
      shiftToDate:[],
      shiftFromTime:[],
      shiftToTime:[],
      shiftRemark:[]
    });
  }

  Shift():FormArray{
    return this.dataForm.get('shift') as FormArray;
  }

  addShift(){
    this.Shift().push(this.newShift());
  }

  removeShift(n:any){
    this.Shift().removeAt(n);
  }

  loadClass(data:any):FormGroup{
    return this.fb.group({
      className:[data[0]],
      classSection:[data[1]],
      classBoys:[data[2]],
      classGirls:[data[3]],
      classStudent:[data[4]],
    });
  }

  newClass():FormGroup{
    return this.fb.group({
      className:[],
      classSection:[],
      classBoys:[],
      classGirls:[],
      classStudent:[],
    });
  }

  Schoolclass():FormArray{
    return this.dataForm.get('schoolClass') as FormArray;
  }

  addClass(){
    this.Schoolclass().push(this.newClass());
  }

  removeClass(j:any){
    this.Schoolclass().removeAt(j);
  }

  next(){
    this.step +=1;
  }

  previous(){
    this.step -=1;
  }

  submit(){
    console.log("check",this.dataForm.controls['level'].value);
      
      this.subService.post(this.dataForm.value , '/schoolUpdate').subscribe(arg =>{
      this.status = arg;
      console.log(arg);

      if (this.status.status != 'error'){
        Swal.fire({
          title:"",
          text:"details saved successfully",
          confirmButtonColor:'blue',
          icon:'success',
          position:'top',

        });
      }
      else{
        Swal.fire({
          title:"",
          text:"Can't save changes! Login Again.",
          confirmButtonColor:'blue',
          icon:'error',
          position:'top',

        });
        this.route.navigate(['/']);
      }
      
    }, error => {
      Swal.fire({
        title:"",
        text:"Login Again!",
        confirmButtonColor:'blue',
        icon:'error',
        position:'top'
      });
      this.route.navigate(['/']);
    });
  }

  change(cnt:any){
    if (cnt>=20){
      cnt=20;
    }
    else if(cnt<1){
      cnt=1;
    }
    this.step=cnt;
    console.log(cnt);
    
  }

}
