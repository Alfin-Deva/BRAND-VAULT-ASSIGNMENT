import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DataService} from '../../services/data.service';
import { commonService } from '../common/common-function';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageAcceptTypes = "image/x-png,image/jpeg";
  @ViewChild("uploadFile") imageElement:ElementRef;
  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.pattern('[a-zA-Z]*')]),
    lastName: new FormControl('',[Validators.pattern('[a-zA-Z]*')]),
    password: new FormControl('',[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')]),
    confirmPassword: new FormControl(''),
    emailID: new FormControl('',[Validators.email,Validators.required]),
    dob: new FormControl(''),
    profilePicture: new FormControl('')
  })
  constructor(private router:Router,private dataService:DataService,private common:commonService) { }

  ngOnInit(): void {
    this.getEditData();
  }

  editView:boolean=false;
  getEditData(){
    this.common.getProfileData().subscribe((result:any)=>{
      if(result!== null){
        this.editView =true;
        this.profileForm.patchValue(result);
        // this = result;
        // console.log("this data--->",this.listData);
        this.profileForm.get("emailID").disable();
      }
      else{
        this.profileForm.get("emailID").enable();
      }
    });
  }

  checkPasswords(profileForm: FormGroup) { // here we have the 'passwords' group
  const password = profileForm.get('password').value;
  const confirmPassword = profileForm.get('confirmPassword').value;

  return password === confirmPassword ? null : { notSame: true }     
}

  insertdata(){
    if(this.profileForm.dirty && this.profileForm.valid){
      this.profileForm.get("emailID").enable();
     let  preparedata = this.profileForm.value;
     
      this.dataService.sendPostRequest(preparedata,'users').then((res:any)=>{
        this.common.setProfileData(res);
        this.router.navigateByUrl('/list');

      })

    }
  }

  processUploadedImage(uploadFile: any) {
    let files: any = uploadFile;
    if (files.length === 0) {
      alert("Something went wrong please choose image again.");
    }
    else {
      let fileType: string = files[0].type;
      let imgSize: number = files[0].size;
      let supportedFileType: string[] = ['image/png', 'image/jpeg'];
      //check image size less than 2 mb.
      if (imgSize <= 20000) {
        if (!supportedFileType.includes(fileType)) {
          this.profileForm.patchValue({
            'profilePicture': ''
          });
        }
        else {
          let reader: FileReader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (_event) => {
            this.profileForm.patchValue({
              'profilePicture': reader.result
            });
            this.profileForm.get('profilePicture').markAsDirty();
          }
        }
      } else {
        alert("Image size is greater than 20kB");
        this.imageElement.nativeElement.value="";
      }
    }
  }

  //checks unique value for fields
  checkUniqueValue(controlName: string) {
    // console.log("calling check------",controlName,this.profileForm.get(controlName).value);
    
    this.profileForm.get(controlName).setAsyncValidators(this.processValidator(controlName));
    this.profileForm.get(controlName).updateValueAndValidity({ onlySelf: true });
  }

  //validator
  processValidator(fieldName: string) {    
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        let value: string = control.value;
        
        if (value) {
          let timeoutID = setTimeout(() => {
              let data = {
                "emailID": value
              };
              
              this.dataService.sendPostRequest(data,'checkUnique').then((res:any) => {
                // console.log("res======",res);
                
                if (res.isUnique === true) {
                  resolve({ 'isNotUnique': true });
                } else {
                  resolve(null);
                }
              })
            clearTimeout(timeoutID);
          }, 2000);
        } else {
          resolve(null);
        }
      });
    }
  }

}
