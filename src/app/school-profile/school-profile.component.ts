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
      Information1:this.fb.group({
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
      Information2:this.fb.group({
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
      Information3:this.fb.group({
      recognizedByGovern:[],
      boardName:[,[Validators.required]],
      affiliationNumber:[,[Validators.required]],
      affiliationYear:[,[Validators.required]],
      affiliationType:[,[Validators.required]],
      affiliationStatement:[],
      christian:[,[Validators.required]],
      hindu:[,[Validators.required]],
      islam:[,[Validators.required]],
      others:[,[Validators.required]],
      nonBeliver:[,[Validators.required]],
      fire:[],
      sanitation:[],
      building:[],
      minority:[],
      }),
      Information4:this.fb.group({
        schoolOwned:[,[Validators.required]],
        trustName:[,[Validators.required]],
        trustRegistered:[,[Validators.required]],
        registeredAct:[],
        registerYear:[],
        registerNo:[,[Validators.required]],
        registrationValidity:[],
        presidentName:[,[Validators.required]],
        presidentDesignation:[],
        presidentAddress:[,[Validators.required]],
        presidentNumber:[,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        presidentEmail:[,[Validators.required,Validators.email,]],
      
      }),
      Information5:this.fb.group({
        governingTrust:[,[Validators.required]],
        governingMember:[],
        governingTenure:[],
        educativeCommunity:[,[Validators.required]],
        educativeCommunityMember:[],
        educativeCommunityTenure:[],
        pta:[,[Validators.required]],
        ptaMember:[],
        ptaTenure:[]
      }),
      Information6:this.fb.group({
        studentCouncil:[,[Validators.required]],
        studentMember:[],
        studentTenure:[],
        generalComplaint:[,[Validators.required]],
        schoolCommit:[,[Validators.required]],
        constitutionCommit:[,[Validators.required]],
        constitutionMember:[],
        constitutionTenure:[],
      }),
      Information7:this.fb.group({
        schoolBuilding:[,[Validators.required]],
        schoolArea:[,[Validators.required]],
        schoolBuilt:[,[Validators.required]],
        groundArea:[,[Validators.required]],
        noBuilding:[,[Validators.required]],
        provision:[],
        noStaircase:[,[Validators.required]],
        noLift:[,[Validators.required]]
      }),
      Information8:this.fb.group({
        schoolHistory:[]
      }),
      Information9:this.fb.group({
        schoolPlan:[]
      }),
      Information10:this.fb.group({
        classRoom:[,[Validators.required]],
        staffRoom:[,[Validators.required]],
        physicalLab:[,[Validators.required]],
        chemistryLab:[,[Validators.required]],
        biologylab:[,[Validators.required]],
        mathsLab:[,[Validators.required]],
        scienceLab:[],
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
      }),
      Information11:this.fb.group({
        boundryWall:[,[Validators.required]],
        boundryWallStatus:[],
        cctv:[,[Validators.required]],
        dataSave:[,[Validators.required]],
        noCamera:[],
        maleGuard:[,[Validators.required]],
        noMaleGuard:[],
        femaleGuard:[,[Validators.required]],
        noFemaleGuard:[],
        drinkWater:[,[Validators.required]],
        drainage:[,[Validators.required]],
      }),
      Information12:this.fb.group({
        middayScheme:[,[Validators.required]],
        noOwnBus:[,[Validators.required]],
        gpsCamera:[,[Validators.required]],
        noladyAttend:[],
        firstAid:[,[Validators.required]],
        noDrinkWater:[,[Validators.required]],
        BusContract:[,[Validators.required]],
        buspass:[,[Validators.required]],
        freeTransport:[,[Validators.required]],
      }),
      Information13:this.fb.group({
        libraryOpenTime:[],
        libraryCloseTime:[],
        noBook:[],
        noMagazine:[],
        noNews:[],
        noEbook:[],
        primaryLibrary:[,[Validators.required]],
        remedial:[],
        tv:[],
        digitalboard:[],
        computer:[],
        projector:[],
        tape:[],
      }),
      Information14:this.fb.group({
        permanentPrincipalMale:[,[Validators.required]],
        permanentPrincipalFemale:[,[Validators.required]],
        temporaryPrincipalMale:[],
        temporaryPrincipalFemale:[],
        permanentVicePrincipalMale:[,[Validators.required]],
        permanentVicePrincipalFemale:[,[Validators.required]],
        temporaryVicePrincipalMale:[],
        temporaryVicePrincipalFemale:[],
        permanentPGTMale:[,[Validators.required]],
        permanentPGTFemale:[,[Validators.required]],
        temporaryPGTMale:[],
        temporaryPGTFemale:[],
        permanentTGTMale:[,[Validators.required]],
        permanentTGTFemale:[,[Validators.required]],
        temporaryTGTMale:[],
        temporaryTGTFemale:[],
        permanentPRTMale:[,[Validators.required]],
        permanentPRTFemale:[,[Validators.required]],
        temporaryPRTMale:[],
        temporaryPRTFemale:[],
        permanentNTTMale:[,[Validators.required]],
        permanentNTTFemale:[,[Validators.required]],
        temporaryNTTMale:[],
        temporaryNTTFemale:[],
        permanentUntrainedTeacherMale:[,[Validators.required]],
        permanentUntrainedTeacherFemale:[,[Validators.required]],
        temporaryUntrainedTeacherMale:[],
        temporaryUntrainedTeacherFemale:[],
        permanentLibrarianMale:[,[Validators.required]],
        permanentLibrarianFemale:[,[Validators.required]],
        temporaryLibrarianMale:[],
        temporaryLibrarianFemale:[],
        permanentMusicTeacherMale:[,[Validators.required]],
        permanentMusicTeacherFemale:[,[Validators.required]],
        temporaryMusicTeacherMale:[],
        temporaryMusicTeacherFemale:[],
        permanentCounsellorMale:[,[Validators.required]],
        permanentCounsellorFemale:[,[Validators.required]],
        temporaryCounsellorMale:[],
        temporaryCounsellorFemale:[],
        permanentComputerLiteracyMale:[,[Validators.required]],
        permanentComputerLiteracyFemale:[,[Validators.required]],
        temporaryComputerLiteracyMale:[],
        temporaryComputerLiteracyFemale:[],
        permanentFaithMinisterMale:[,[Validators.required]],
        permanentFaithMinisterFemale:[,[Validators.required]],
        temporaryFaithMinisterMale:[],
        temporaryFaithMinisterFemale:[],
        permanentNurseMale:[,[Validators.required]],
        permanentNurseFemale:[,[Validators.required]],
        temporaryNurseMale:[],
        temporaryNurseFemale:[],
        permanentPTTeacherMale:[,[Validators.required]],
        permanentPTTeacherFemale:[,[Validators.required]],
        temporaryPTTeacherMale:[],
        temporaryPTTeacherFemale:[],
      }),
      Information15:this.fb.group({
        permanentOfficeManager:[],
        temporaryOfficeManager:[],
        partTimeOfficeManager:[],
        permanentOfficeAssistant:[],
        temporaryOfficeAssistant:[],
        partTimeOfficeAssistant:[],
        permanentClerk:[],
        temporaryClerk:[],
        partTimeClerk:[],
        permanentLabAttendants:[],
        temporaryLabAttendants:[],
        partTimeLabAttendants:[],
        permanentAccountant:[],
        temporaryAccountant:[],
        partTimeAccountant:[],
        permanentPeonesClerk:[],
        temporaryPeonesClerk:[],
        partTimePeonesClerk:[],
        permanentOthers:[],
        temporaryOthers:[],
        partTimeOthers:[],
      }),
      Information16:this.fb.group({
        noCurricularActivities:[],
        noGroupsPresent:[],
        noCommunityService:[],
        schoolSports:[],
        zonalSports:[],
        districtSports:[],
        stateSports:[],
        nationalSports:[],
        internationalSports:[],
        schoolCompetition:[],
        zonalCompetition:[],
        districtCompetition:[],
        stateCompetition:[],
        nationalCompetition:[],
        internationalCompetition:[],
        schoolProgram:[],
        zonalProgram:[],
        districtProgram:[],
        stateProgram:[],
        nationalProgram:[],
        internationalProgram:[],
      }),
      Information17:this.fb.group({
        academicYearStart:[],
        academicYearEnd:[],
        noWorkingDays1:[],
        noWorkingDays2:[],
        noWorkingDays3:[],
        noWorkingHours1:[],
        noWorkingHours2:[],
        noWorkingHours3:[],
        totalHours1:[],
        totalHours2:[],
        totalHours3:[],
        noWorkingDaysForStaff1:[],
        noWorkingDaysForStaff2:[],
        noWorkingDaysForStaff3:[],
        noHolidays1:[],
        noHolidays2:[],
        noHolidays3:[]
      }),
      Information18:this.fb.group({
        noSubjectPerWeek:[],
        noMoralTeachPerWeek:[],
        teachingDuration:[],
        noHoursForActivity:[],
        fromTimeInSummer:[],
        toTimeInSummer:[],
        fromTimeInWinter:[],
        toTimeInWinter:[],
        schoolWorkWithShift:[]
      }),
      Information19:this.fb.group({
        scholarship:this.fb.array([])
      }),
      Information20:this.fb.group({
        shift:this.fb.array([]),
      schoolClass:this.fb.array([])
      }),
      
    });

    this.subService.get('/SchoolProfile').subscribe(arg=>{
      
      // set multiselect value for school level
      for(let val of arg.Information2['schoolLevel']){
        this.selected.push({id:Number(val[0]),text:val[1]});
      }
      arg.Information2['schoolLevel'] = this.selected;

      // set multiselect for medium
      this.selected=[];
      for (let val of arg.Information2['medium']){
        this.selected.push({id:Number(val[0]),text:val[1]})
      }
      arg.Information2['medium'] =this.selected;
      this.dataForm.patchValue(arg);
      
      
      this.get=arg.Information19['scholarship'];
      for (let data of this.get){         
        this.Scholarship().push(this.loadScholarship(data));
      }

      this.get = arg.Information20['shift'];
      for(let data of this.get){
        this.Shift().push(this.loadShift(data));
      }

      this.get = arg.Information20['schoolClass'];
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
    return this.dataForm.get('Information19.scholarship') as FormArray;
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
    return this.dataForm.get('Information20.shift') as FormArray;
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
    return this.dataForm.get('Information20.schoolClass') as FormArray;
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
    
    var name='Information'+data;
    console.log(data,this.step ,name);
    this.submitted=true;
    console.log(this.dataForm.controls[name].value);
    
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

  steps(val:any){
    this.step=val;
  }

}
