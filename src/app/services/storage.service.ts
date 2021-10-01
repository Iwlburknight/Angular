import { Injectable } from '@angular/core';

// 看能不能通过服务实现数据共享
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {


  public myJson: any = '';

  valueUpdate: Subject<any> = new Subject<any>();

  constructor() { }


  // 然后就可以写服务的方法了
  setJson(val) {
    this.myJson = val;
    this.valueUpdate.next(this.myJson);
  }

  getJson(): any {
    return this.myJson;
  }

// ___________________________

  setCookies(key: any, item: any) {

    localStorage.setItem(key, JSON.stringify(item));

  }
  getCookies(key: any) {

    return JSON.parse(localStorage.getItem(key));

  }
  removeCookies(key: any) {

    localStorage.removeItem(key);

  }

  // setKeyArray(key:any, item:any){
  //   let tempArr:any[] = [];
  //   tempArr.push(item);
  //   localStorage.setItem(key, tempArr);
  // }


  // 时间转换
  getTime(timeStamp: any): any {

    let myDate = new Date(timeStamp * 1000);
    let myYear = myDate.getFullYear();
    let myMonth = ((myDate.getMonth() + 1) < 10 ? ('0' + (myDate.getMonth() + 1)) : (myDate.getMonth() + 1));
    let myDay = (myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate());

    let  myResult: any = myDay + '/' + myMonth + '/' + myYear;
    return myResult;
  }
}

