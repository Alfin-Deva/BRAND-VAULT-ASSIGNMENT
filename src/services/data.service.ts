import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // constructor(private http:HttpClient) { }

  // sendPostRequest(data,endPoint){
  // const url= 'http://localhost:3000/'+ endPoint;

  // const httpOptions = {
  //   header: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Access-Control-Allow-Credentials' : 'true',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  //   })
  // };
  // console.log('dataservice---->',data , endPoint,httpOptions);

  // return this.http.post(url,data,httpOptions).toPromise().then(response=>{
  //   console.log("response---->",response);
  //   return response;
  // }).catch(error=>{
  //   return Promise.reject(error)
  // })
  // }

  constructor(private http:HttpClient) { }

  sendPostRequest(data,endpoint){
    const url = 'http://localhost:3000/'+endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    return this.http.post(url,data,httpOptions).toPromise().then(response=>{
      return response;
    }).catch(error=>{
      return Promise.reject(error)
    }
    )

  }
}
