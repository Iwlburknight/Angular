import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public myData:any ='';

  public searchList:any[]=[];

  public toDoList:any[]=[];
  public toDoString:string='';


  constructor(public myService: StorageService) {
  }

  ngOnInit() {

    //保存search列表
    var searchList1:any = this.myService.getCookies('myHistory');
    if(searchList1){
      this.searchList = searchList1;
    }

    // 保存todolist
    var todoList1:any = this.myService.getCookies('toDoHistory');
    if(todoList1){
      this.toDoList = todoList1;
    }
  }

  doSearch(){
    if(this.searchList.indexOf(this.myData) == -1){
      this.searchList.push(this.myData);
      this.myService.setCookies('myHistory',this.searchList);
    }
    this.myData='';
  }

  deleteData(curKey){
    this.searchList.splice(curKey,1);
    this.myService.setCookies('myHistory',this.searchList);
  }

  doAdd(e){

    if(e.keyCode==13){

      if(!this.toDoListHasKey(this.toDoList,this.toDoString)){
        this.toDoList.push({
          title:this.toDoString,
          status:0
        });

        this.myService.setCookies('toDoHistory',this.toDoList);


      }
      this.toDoString='';
    }
  }
  deleteThing(toDoKey){

    this.toDoList.splice(toDoKey,1);
    this.myService.setCookies('toDoHistory', this.toDoList);

  }

  toDoListHasKey(todolist:any,key:any){
    for(var i=0;i<todolist.length;i++){
      if(todolist[i].title == key){
        return true;
      }
    }
    return false;
  }

  changeBox(){
    console.log(this.toDoList);
    this.myService.setCookies('toDoHistory', this.toDoList);
  }

}
