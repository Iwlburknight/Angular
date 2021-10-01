import { Component, OnInit,ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('son',{static:true}) mySon:any;

  public title:any = "This is home's header";


  constructor() { }

  ngOnInit() {
  }

  run(){
    alert("I am the father");
  }

  getSonMsg(){
    alert(this.mySon.sonMsg);
  }
  callSonFunc(){
    this.mySon.sonFunc();
  }

  runParent(e){
    alert(e);
  }

}
