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
  submitted = false;
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

    this.medium=[
      {id:1 , text:'Tamil'},
      {id:2 , text:'English'},
      {id:3 , text:'Telugu'},
      {id:4 , text:'Hindi'},
      {id:5 , text:'Malayalam'},
      {id:6 , text:'Kannada'},
    ];

    this.dataForm = this.fb.group({
      generalInformation1:this.fb.group({
        institutionName:[,[Validators.required]],
        postalAddress:[,[Validators.required]] ,
        district:[,[Validators.required]],
        state:[,[Validators.required]],
        cityVillageTown:[,[Validators.required]],
        pincode:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(6),Validators.maxLength(6)]],
        url:[,[Validators.required]],
        officeMail:[,[Validators.required,Validators.email]],  
        officeMobile:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        schoolLocation:[,[Validators.required]],
        childNeeds:[],
        academicYear:[,[Validators.required]],
      }),
      generalInformation2:this.fb.group({
        establishYear:[],
        schoolLevel:[,[Validators.required]],
        medium:[,[Validators.required]],
        affiliationNature:[,[Validators.required]],
        teachingStaff:[,[Validators.required]],
        gender:[,[Validators.required]],
        noGirls:[,[Validators.required]],
        noBoys:[,[Validators.required]],
        totalStudent:[,[Validators.required]],
        nonTeachingStaff:[,[Validators.required]],
        correspondentName:[,[Validators.required]],
        correspondentMobileNo:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        correspondentMailId:[,[Validators.required,Validators.email]],
        principalName:[,[Validators.required]],
        principalMailId:[,[Validators.required,Validators.email]],
        principalOfficeMobileNo:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        principalMobileNo:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      
      }),
      recognized:[],
      board_name:[,[Validators.required]],
      affiliate_number:[,[Validators.required]],
      affiliate_year:[,[Validators.required]],
      affiliate_type:[,[Validators.required]],
      affiliate_state:[],
      christian:[,[Validators.required]],
      hindu:[,[Validators.required]],
      islam:[,[Validators.required]],
      others:[,[Validators.required]],
      nonBeliver:[,[Validators.required]],
      fire:[],
      sanitation:[],
      building:[],
      minority:[],
      own:[,[Validators.required]],
      trust_name:[,[Validators.required]],
      trust_register:[,[Validators.required]],
      register_act:[],
      register_year:[],
      register_no:[,[Validators.required]],
      register_validity:[],
      president_name:[,[Validators.required]],
      president_designation:[],
      president_address:[,[Validators.required]],
      president_number:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      president_email:[,[Validators.required,Validators.email,]],
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
      schoolArea:[,[Validators.required]],
      schoolBuilt:[,[Validators.required]],
      groundArea:[,[Validators.required]],
      noBuilding:[,[Validators.required]],
      provision:[],
      noStaircase:[,[Validators.required]],
      lift:[,[Validators.required]],
      classRoom:[,[Validators.required]],
      staffRoom:[,[Validators.required]],
      physicalLab:[,[Validators.required]],
      chemistryLab:[,[Validators.required]],
      biologylab:[,[Validators.required]],
      mathsLab:[,[Validators.required]],
      science:[],
      library:[,[Validators.required]],
      auditorium:[,[Validators.required]],
      counselor:[,[Validators.required]],
      parlor:[],
      prayer:[],
      sick:[,[Validators.required]],
      canteen:[],
      security:[],
      otherRoom:[],
      staffToilets:[,[Validators.required]],
      studToilet:[,[Validators.required]],
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
      midday:[,[Validators.required]],
      nobus:[,[Validators.required]],
      gps:[,[Validators.required]],
      noladyAttend:[],
      firstAid:[,[Validators.required]],
      noDrinkWater:[,[Validators.required]],
      BusContract:[,[Validators.required]],
      buspass:[,[Validators.required]],
      freeTransport:[,[Validators.required]],
      library_open:[],
      library_close:[],
      noBook:[],
      magazine:[],
      noNews:[],
      noEbook:[],
      primaryLibrary:[,[Validators.required]],
      remedial:[],
      tv:[],
      digitalboard:[],
      computer:[],
      projector:[],
      tape:[],
      ppm:[,[Validators.required]],
      ppf:[,[Validators.required]],
      tpm:[],
      tpf:[],
      pvm:[,[Validators.required]],
      pvf:[,[Validators.required]],
      tvm:[],
      tvf:[],
      ppgtm:[,[Validators.required]],
      ppgtf:[,[Validators.required]],
      tpgtm:[],
      tpgtf:[],
      ptgtm:[,[Validators.required]],
      ptgtf:[,[Validators.required]],
      ttgtm:[],
      ttgtf:[],
      pprtm:[,[Validators.required]],
      pprtf:[,[Validators.required]],
      tprtm:[],
      tprtf:[],
      pnttm:[,[Validators.required]],
      pnttf:[,[Validators.required]],
      tnttm:[],
      tnttf:[],
      putm:[,[Validators.required]],
      putf:[,[Validators.required]],
      tutm:[],
      tutf:[],
      plm:[,[Validators.required]],
      plf:[,[Validators.required]],
      tlm:[],
      tlf:[],
      pmtm:[,[Validators.required]],
      pmtf:[,[Validators.required]],
      tmtm:[],
      tmtf:[],
      pctm:[,[Validators.required]],
      pctf:[,[Validators.required]],
      tctm:[],
      tctf:[],
      pcltm:[,[Validators.required]],
      pcltf:[,[Validators.required]],
      tcltm:[],
      tcltf:[],
      pfmm:[,[Validators.required]],
      pfmf:[,[Validators.required]],
      tfmm:[],
      tfmf:[],
      pnm:[,[Validators.required]],
      pnf:[,[Validators.required]],
      tnm:[],
      tnf:[],
      pptm:[,[Validators.required]],
      pptf:[,[Validators.required]],
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

      // set multiselect value for school level
      for(let val of arg.generalInformation2['schoolLevel']){
        this.selected.push({id:Number(val[0]),text:val[1]});
      }
      arg.generalInformation2['schoolLevel'] = this.selected;

      // set multiselect for medium
      this.selected=[];
      for (let val of arg.generalInformation2['medium']){
        this.selected.push({id:Number(val[0]),text:val[1]})
      }
      arg.generalInformation2['medium'] =this.selected;
      this.dataForm.patchValue(arg);
      
      // this.get=arg.scholarship;
      // for (let data of this.get){         
      //   this.Scholarship().push(this.loadScholarship(data));
      // }

      // this.get = arg.shift;
      // for(let data of this.get){
      //   this.Shift().push(this.loadShift(data));
      // }

      // this.get = arg.schoolClass;
      // for(let data of this.get){
      //   this.Schoolclass().push(this.loadClass(data));
      // }
      
      
    },
    error =>{
      Swal.fire({
        title:'Session ended !',
        text:"login Again...",
        icon:'warning',
        position:'center',
        confirmButtonColor:'blue',
      });
      this.route.navigate(['/']);
    });
    
  }

  // scholarship methods
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

// school shift methods
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

  // school class detail methods
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

  // next page
  next(){
    this.step +=1;
  }
// previous page
  previous(){
    this.step -=1;
  }
// form submit method
  submit(data:any){
    console.log(data);
    var name='generalInformation'+data;
    this.submitted=true;
    if(this.dataForm.controls[name].valid){      
      this.subService.post(this.dataForm.controls[name].value , '/schoolUpdate').subscribe(arg =>{
        this.status = arg;
        this.Status();
      },error =>{
        Swal.fire({
          title:'Session ended !',
          text:"login Again...",
          icon:'warning',
          position:'center',
          confirmButtonColor:'blue',
        });
        this.route.navigate(['/']);
      });
    } 

  }
// form submit status from api
  Status(){
    if (this.status.status_code != 'error'){
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
      // this.route.navigate(['/']);
    }
  }

  steps(){
    this.step=20;
  }

}
