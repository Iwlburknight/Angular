import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header-son',
  templateUrl: './header-son.component.html',
  styleUrls: ['./header-son.component.css']
})
export class HeaderSonComponent implements OnInit {


  @Input() title:any;
  @Input() run:any;
  @Input() home:any;

  @Output() private outer = new EventEmitter<any>();


  public sonMsg:string = "This is from son component"

  constructor() { }

  ngOnInit() {
    alert("son come");
  }

  runSon(){
    alert(this.home.title);
    this.home.run();
  }

  sonFunc(){
    alert("This is the function from son");
  }


  sendParent(){
    this.outer.emit("msg from son!!!");
  }

}
