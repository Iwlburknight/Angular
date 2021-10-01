import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';

// 引入canvasjs
import * as CanvasJS from './canvasjs.min';


// 尝试下ngb modal
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements OnInit {

  @ViewChild('myBtn', { static: true }) myBtn: ElementRef;


  private getJsonWeekly: any = '';

  private chart: any;

  closeResult: string;





  constructor(private myService: StorageService, private modalService: NgbModal, private httpDetail: HttpClient) {
    this.getJsonWeekly = myService.getJson();
  }


  // ngb modal 尝试
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }





  ngOnInit() {

    this.myService.valueUpdate.subscribe(
      (val) => {
        this.getJsonWeekly = this.myService.getJson();
      }
    );
    console.log(this.getJsonWeekly);

    let dataArray: any[] = [];
    let xIndex = 0;
    for (let i = 7; i >= 0; i--) {
      let tempTime = this.getJsonWeekly.weatherJson.daily.data[i].time;
      tempTime = this.myService.getTime(tempTime);
      xIndex += 10;
      let tempLow = Math.round(this.getJsonWeekly.weatherJson.daily.data[i].temperatureLow);
      let tempHigh = Math.round(this.getJsonWeekly.weatherJson.daily.data[i].temperatureHigh);

      let tempObj: any = {
        'x' : xIndex,
        'y' : [tempLow, tempHigh],
        'label' : tempTime
      };
      dataArray.push(tempObj);
    }

    // 这里画图
    setTimeout(() => {
      this.chart = new CanvasJS.Chart("chartContainer",{
        animationEnabled: true,
        exportEnabled: false,
        title: {
          text: "Weekly Weather"
        },
        legend: {
          verticalAlign : 'top'
        },
        axisX: {
          title: "Days"
        },
        axisY: {
          includeZero: false,
          title: "Temperature in Fahrenheit",
          gridThickness: 0,
          interval: 10
        },
        data: [{
          type: "rangeBar",
          color: '#7EC6ED',
          showInLegend: true,
          yValueFormatString: "#0#",
          indexLabel: "{y[#index]}",
          legendText: "Day wise temperature range",
          toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
          dataPoints: dataArray,



          // click 出modal框
          click: e => {
            let tempTimeStamp: any = this.getJsonWeekly.weatherJson.daily.data[7 - e.dataPointIndex].time;
            let tempLat = this.getJsonWeekly.weatherJson.latitude;
            let tempLng = this.getJsonWeekly.weatherJson.longitude;

            // 至此拿到了detail JSON
            // let detailUrl = 'http://test-env.eba-tfhh2p4y.us-west-1.elasticbeanstalk.com/getDetailJson?lat=' + tempLat + '&lng=' + tempLng + '&time=' + tempTimeStamp;
            // console.log(window.location.href);
            // let curUrl = window.location.href;
            let detailUrl = 'http://weatherapp-env.eba-uywrnxtt.us-west-1.elasticbeanstalk.com/getDetailJson?lat=' + tempLat + '&lng=' + tempLng + '&time=' + tempTimeStamp;
            this.httpDetail.get(detailUrl).subscribe((response: any) => {

              // 不管了，我就用DOM了
              this.myBtn.nativeElement.click();
              console.log(response);

              document.getElementById('modal-basic-title').innerText = this.myService.getTime(response.currently.time);

              document.getElementById('modalCity').innerText = this.getJsonWeekly.city;
              let temp: any = Math.round(response.currently.temperature);
              document.getElementById('modalTemp').innerHTML = temp;
              document.getElementById('modalSummary').innerHTML = response.currently.summary;


              let tempPrecip = Number(response.currently.precipIntensity).toFixed(2);
              document.getElementById('precipitation').innerHTML = 'Precipitation : ' + tempPrecip;


              let tempChanceOfRain = Math.round(response.currently.precipProbability * 100);
              document.getElementById('chanceOfRain').innerHTML = 'Chance of Rain : ' + tempChanceOfRain + ' %';

              let tempWindSpeed = Number(response.currently.windSpeed).toFixed(2);
              document.getElementById('windSpeed').innerHTML = 'Wind Speed : ' + tempWindSpeed + ' mph';

              let tempHumidity = Math.round(response.currently.humidity * 100);
              document.getElementById('humidity').innerHTML = 'Humidity : ' + tempHumidity + ' %';

              let tempVisibility = Number(response.currently.visibility).toFixed(2);
              document.getElementById('visibility').innerHTML = 'Visibility : ' + tempVisibility + ' miles';


              // 图片
              let tempImg = response.currently.icon;
              if(tempImg === "clear-day" || tempImg === "clear-night"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png");
              }
              else if(tempImg === "rain"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png");
              }
              else if(tempImg === "snow"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png");
              }
              else if(tempImg === "sleet"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png");
              }
              else if(tempImg === "wind"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png");
              }
              else if(tempImg === "fog"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png");
              }
              else if(tempImg === "cloudy"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png");
              }
              else if(tempImg === "partly-cloudy-day" || tempImg === "partly-cloudy-night"){
                document.getElementById('modalImg').setAttribute('src', "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png");
              }
              else {
                document.getElementById('modalImg').setAttribute('src', '#');
              }

            });
          }
        }]
      });
      this.chart.render();
    }, 500);
  }


}
