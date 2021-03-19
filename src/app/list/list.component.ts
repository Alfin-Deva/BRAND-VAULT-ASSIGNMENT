import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { commonService } from '../common/common-function';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
listData:any[]=[];
  constructor(private router:Router,private common:commonService,private dataService:DataService){ }

  ngOnInit(): void {
    this.getListData();
  }

  getListData(){
    this.dataService.sendPostRequest({},"getUserList").then((result:any)=>{
      console.log("list Data=====",result);
      this.listData = result;
    });
    // this.common.getProfileData().subscribe((result:any)=>{
    //   if(result){
    //     this.listData = result;
    //     console.log("this data--->",this.listData);
    //   }
    // });
  }

  editUser(item:object){
      this.common.setProfileData(item);
      this.router.navigateByUrl("home");
  }
  addUser(){
    this.common.setProfileData(null);
    this.router.navigateByUrl("home");
  }

}
