import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class commonService {
    
    profileData:BehaviorSubject<any> = new BehaviorSubject<any>(null)

setProfileData(data){
    this.profileData.next(data)
}

getProfileData():Observable<any>
{
    return this.profileData.asObservable();
}

}