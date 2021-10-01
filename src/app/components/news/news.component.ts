import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

// 引入http模块
import { HttpClient } from "@angular/common/http";

// 引入一个服务模块，将得到的JSON存在localStorage
import { StorageService } from "../../services/storage.service";

// 引用ng-bootstrap 模块  好像目前还没有用上
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FormControl } from "@angular/forms";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  providers: [StorageService],
})
export class NewsComponent implements OnInit {
  // 渲染第一张card所需要的元素节点
  @ViewChild("cardCity", { static: true }) cardCity: ElementRef;
  @ViewChild("cardTimeZone", { static: true }) cardTimeZone: ElementRef;
  @ViewChild("cardTemp", { static: true }) cardTemp: ElementRef;
  @ViewChild("cardSummary", { static: true }) cardSummary: ElementRef;
  @ViewChild("cardImg", { static: true }) cardImg: ElementRef;

  // 表格所需 嗯填
  @ViewChild("iconTip0", { static: true }) iconTip0: ElementRef;
  @ViewChild("iconImg0", { static: true }) iconImg0: ElementRef;
  @ViewChild("iconValue0", { static: true }) iconValue0: ElementRef;
  @ViewChild("iconTip1", { static: true }) iconTip1: ElementRef;
  @ViewChild("iconImg1", { static: true }) iconImg1: ElementRef;
  @ViewChild("iconValue1", { static: true }) iconValue1: ElementRef;
  @ViewChild("iconTip2", { static: true }) iconTip2: ElementRef;
  @ViewChild("iconImg2", { static: true }) iconImg2: ElementRef;
  @ViewChild("iconValue2", { static: true }) iconValue2: ElementRef;

  @ViewChild("iconTip3", { static: true }) iconTip3: ElementRef;
  @ViewChild("iconImg3", { static: true }) iconImg3: ElementRef;
  @ViewChild("iconValue3", { static: true }) iconValue3: ElementRef;
  @ViewChild("iconTip4", { static: true }) iconTip4: ElementRef;
  @ViewChild("iconImg4", { static: true }) iconImg4: ElementRef;
  @ViewChild("iconValue4", { static: true }) iconValue4: ElementRef;
  @ViewChild("iconTip5", { static: true }) iconTip5: ElementRef;
  @ViewChild("iconImg5", { static: true }) iconImg5: ElementRef;
  @ViewChild("iconValue5", { static: true }) iconValue5: ElementRef;

  // progress bar
  @ViewChild("myProgressBar", { static: true }) myProgressBar: ElementRef;
  @ViewChild("twitterATag", { static: true }) twitterATag: ElementRef;
  @ViewChild("favoriteImg", { static: true }) favoriteImg: ElementRef;

  @ViewChild("resultBtn", { static: true }) resultBtn: ElementRef;
  @ViewChild("favoriteBtn", { static: true }) favoriteBtn: ElementRef;

  // fav栏的 经典渲染
  @ViewChild("tr0", { static: true }) tr0: ElementRef;
  @ViewChild("favId0", { static: true }) favId0: ElementRef;
  @ViewChild("favImg0", { static: true }) favImg0: ElementRef;
  @ViewChild("favCity0", { static: true }) favCity0: ElementRef;
  @ViewChild("favState0", { static: true }) favState0: ElementRef;
  @ViewChild("favDelete0", { static: true }) favDelete0: ElementRef;

  @ViewChild("tr1", { static: true }) tr1: ElementRef;
  @ViewChild("favId1", { static: true }) favId1: ElementRef;
  @ViewChild("favImg1", { static: true }) favImg1: ElementRef;
  @ViewChild("favCity1", { static: true }) favCity1: ElementRef;
  @ViewChild("favState1", { static: true }) favState1: ElementRef;
  @ViewChild("favDelete1", { static: true }) favDelete1: ElementRef;

  @ViewChild("tr2", { static: true }) tr2: ElementRef;
  @ViewChild("favId2", { static: true }) favId2: ElementRef;
  @ViewChild("favImg2", { static: true }) favImg2: ElementRef;
  @ViewChild("favCity2", { static: true }) favCity2: ElementRef;
  @ViewChild("favState2", { static: true }) favState2: ElementRef;
  @ViewChild("favDelete2", { static: true }) favDelete2: ElementRef;

  @ViewChild("tr3", { static: true }) tr3: ElementRef;
  @ViewChild("favId3", { static: true }) favId3: ElementRef;
  @ViewChild("favImg3", { static: true }) favImg3: ElementRef;
  @ViewChild("favCity3", { static: true }) favCity3: ElementRef;
  @ViewChild("favState3", { static: true }) favState3: ElementRef;
  @ViewChild("favDelete3", { static: true }) favDelete3: ElementRef;

  @ViewChild("tr4", { static: true }) tr4: ElementRef;
  @ViewChild("favId4", { static: true }) favId4: ElementRef;
  @ViewChild("favImg4", { static: true }) favImg4: ElementRef;
  @ViewChild("favCity4", { static: true }) favCity4: ElementRef;
  @ViewChild("favState4", { static: true }) favState4: ElementRef;
  @ViewChild("favDelete4", { static: true }) favDelete4: ElementRef;

  public chartIndexValue: string = "temperature";

  // 双向绑定来控制tab的显示
  public showWhichTab: string = "current";

  // 输入地址得到JSON
  public street: any = "";
  public city: any = "";
  public state: any = "Select State";

  // 本地API得到JSON
  public myLat: any = "";
  public myLng: any = "";
  public localState: any = "";
  public localCity: any = "";

  // 存放当前的JSON
  private currentJson: any = "";
  public autoFillJson: any = "";

  // public domainUrl = window.location.href;

  //一开始让它不显示
  public noRecord: boolean = true;
  public invalidAddress: boolean = true;

  // 控制各个tab的显示
  public isChecked: boolean = false;
  // 这是控制整个内容区域的显示，包含 tab和对应的所有tab-div,设计是点击search后切换。 暂时还没有实现
  public bodyHidden: boolean = true;

  // 控制进度条
  public hiddenProgress: boolean = true;

  public isDisabled: boolean = false;

  // 图表的测试

  public barChartLabels = [];
  public barChartType = "bar";
  public barChartLegend = true;

  // 要改
  public barChartOptions0 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
          ticks: {
            suggestedMin: 27,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };
  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };
  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };
  public barChartOptions3 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };
  public barChartOptions4 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
          ticks: {
            max: 12,
            min: 0,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };
  public barChartOptions5 = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    easing: "linear",
    legend: {
      onClick: null,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
          },
        },
      ],
    },
  };

  // 要改
  public barChartData0 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];
  public barChartData1 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];
  public barChartData2 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];
  public barChartData3 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];
  public barChartData4 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];
  public barChartData5 = [
    {
      data: [],
      label: this.chartIndexValue,
      backgroundColor: "#7EC6ED",
      hoverBackgroundColor: "#4986A6",
    },
  ];

  // 自动填充
  public autoFillArr: any[] = [];

  public myControl = new FormControl();

  // 图表数据
  public chartHelper: any[] = [
    {
      name: "temperature",
      lable: "Fahrenheit",
    },
    {
      name: "pressure",
      lable: "Millibars",
    },
    {
      name: "humidity",
      lable: "% Humidity",
    },
    {
      name: "ozone",
      lable: "Dobson Units",
    },
    {
      name: "visibility",
      lable: "Miles(Maximum 10)",
    },
    {
      name: "windSpeed",
      lable: "Miles per hour",
    },
  ];

  public hasbeenFav: boolean = false;

  public inFavorite: boolean = false;

  constructor(public http: HttpClient, private myService: StorageService) {
    // 使用服务进行组件间数据共享
    this.currentJson = myService.getJson();
    // console.log(this.domainUrl);
  }

  ngOnInit() {}

  // 感觉是可以通过click事件来改变的
  showCurrent() {
    this.showWhichTab = "current";
  }

  // 在这里画 chartJS的表
  showHourly() {
    setTimeout(() => {
      this.showWhichTab = "hourly";
    }, 200);
    // this.showWhichTab = 'hourly';
  }

  // 这里画 canvasJS的表
  showWeekly() {
    this.showWhichTab = "weekly";
  }

  // 得到  需要的天气JSON
  getLocJson() {
    if (!this.isChecked) {
      this.isDisabled = true;
      let locApi = "http://ip-api.com/json";
      this.http.get(locApi).subscribe((response: any) => {
        console.log(response);
        this.myLat = response.lat;
        this.myLng = response.lon;
        this.localState = response.region;
        this.localCity = response.city;
      });
    } else {
      this.isDisabled = false;
    }
  }

  // 自动填充
  autoComplete(e) {
    console.log(this.city);

    if (this.city !== "") {
      // let autoCompleteApi = 'http://test-env.eba-tfhh2p4y.us-west-1.elasticbeanstalk.com/autoComplete?clue=' + this.city.toUpperCase();
      // let autoCompleteApi = "api/autoComplete?clue=" + this.city.toUpperCase();
      let autoCompleteApi = "http://weatherapp-env.eba-uywrnxtt.us-west-1.elasticbeanstalk.com/autoComplete?clue=" + this.city.toUpperCase();
      this.http.get(autoCompleteApi).subscribe((response: any) => {
        this.autoFillJson = response;
        console.log(this.autoFillJson);

        if (response.status === "ZERO_RESULTS") {
          console.log("invalid address");
          // 然后在这里处理 无效地址
        } else {
          let tempArray: any[] = [];
          for (let i = 0; i < response.predictions.length; i++) {
            tempArray.push(
              response.predictions[i].structured_formatting.main_text
            );
          }
          this.autoFillArr = tempArray;
        }
      });
    }
  }

  // 这里是得到JSON
  getJson() {
    // 通过表单信息得到天气JSON
    if (this.isChecked === false) {
      let address: any = this.street + "," + this.city + "," + this.state;
      if (address !== null) {
        // let addressUrl = 'http://localhost:3000/getJsonByForm?address=' + address + '&city=' + this.city + '&state=' + this.state;
        let addressUrl =
          "http://weatherapp-env.eba-uywrnxtt.us-west-1.elasticbeanstalk.com/getJsonByForm?address=" +
          address +
          "&city=" +
          this.city +
          "&state=" +
          this.state;
        console.log(addressUrl);
        return new Promise((resolve, reject) => {
          this.http.get(addressUrl).subscribe((response: any) => {
            resolve(response);
          });
        });
      }
    }
    // 通过本地信息得到天气JSON
    else {
      // let localUrl = 'http://localhost:3000/getJsonByLocal?lat=' + this.myLat + '&lng=' + this.myLng + '&state=' + this.localState + '&city=' + this.localCity;
      let localUrl =
        "http://weatherapp-env.eba-uywrnxtt.us-west-1.elasticbeanstalk.com/getJsonByLocal?lat=" +
        this.myLat +
        "&lng=" +
        this.myLng +
        "&state=" +
        this.localState +
        "&city=" +
        this.localCity;
      return new Promise((resolve, reject) => {
        this.http.get(localUrl).subscribe((response: any) => {
          resolve(response);
        });
      });
    }
  }

  async getData() {
    let data: any = await this.getJson();
    return data;
  }

  // 进度条 完美
  progress() {
    this.hiddenProgress = false;
    let myProgress = 0;
    let interval = setInterval(() => {
      myProgress += 20;
      this.myProgressBar.nativeElement.style.width = myProgress + "%";
      if (myProgress > 100) {
        clearInterval(interval);
        this.bodyHidden = false;
        this.hiddenProgress = true;
        this.myProgressBar.nativeElement.style.width = "0%";
      }
    }, 200);
  }

  // 这里是点击search按钮所触发的事件，进行一次AJAX call，在后端nodejs脚本里调用API获取JSON,并将得到的JSON 存在 localStorage里
  getWeatherJson() {
    if (!this.isChecked && this.autoFillJson.status === "ZERO_RESULTS") {
      this.showInvalidAddress();
    } else {
      this.progress();
      this.getData().then((res: any) => {
        console.log(res);
        this.currentJson = res;
        this.myService.myJson = res;

        this.renderMyCard(res);
        this.renderHourlyChart(res);

        if (this.myService.getCookies(res.city) != null) {
          this.favoriteImg.nativeElement.innerText = "star";
          this.favoriteImg.nativeElement.style =
            "font-size:225%; color:goldenrod";
          this.hasbeenFav = true;
        }
        this.showResult();
      });
    }
  }

  // 渲染表格
  renderMyCard(data: any) {
    // 渲染text
    // this.cardCity.nativeElement.innerText = ((this.city === '') ? this.localCity : this.city);
    this.cardCity.nativeElement.innerText = this.currentJson.city;
    this.cardTimeZone.nativeElement.innerText = data.weatherJson.timezone;
    this.cardTemp.nativeElement.innerText = Math.round(
      data.weatherJson.currently.temperature
    );
    this.cardSummary.nativeElement.innerText =
      data.weatherJson.currently.summary;

    // 渲染图片
    this.cardImg.nativeElement.src = data.url;

    // 先过滤再渲染表格
    let iconArray: any[] = [
      {
        iconName: "humidity",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png",
      },
      {
        iconName: "pressure",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png",
      },
      {
        iconName: "windSpeed",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png",
      },
      {
        iconName: "visibility",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png",
      },
      {
        iconName: "cloudCover",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png",
      },
      {
        iconName: "ozone",
        iconUrl:
          "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png",
      },
    ];
    let myArray: any[] = [];
    for (let i = 0; i < iconArray.length; i++) {
      // 牛批，这种JS中将变量代替JSON节点的方法
      let iconValue: any = data.weatherJson.currently[iconArray[i].iconName];

      if (iconValue != null && iconValue !== 0) {
        let tempObj: any = {
          objValue: iconValue,
          objUrl: iconArray[i].iconUrl,
          objTipText:
            iconArray[i].iconName.charAt(0).toUpperCase() +
            iconArray[i].iconName.slice(1),
        };
        myArray.push(tempObj);
      }
    }

    for (let i = 0; i < myArray.length; i++) {
      let indexTip: string = "iconTip" + i;
      let indexImg: string = "iconImg" + i;
      let indexValue: string = "iconValue" + i;

      this[indexTip].nativeElement.setAttribute(
        "data-original-title",
        myArray[i].objTipText
      );
      this[indexImg].nativeElement.setAttribute("src", myArray[i].objUrl);
      this[indexValue].nativeElement.innerText = myArray[i].objValue;
    }
  }

  // 渲染hourly chart
  renderHourlyChart(data: any) {
    this.barChartLabels = [];
    for (let i = 0; i < 24; i++) {
      this.barChartLabels.push(i);
    }

    for (let j = 0; j < 6; j++) {
      let tempArray: any[] = [];
      let index: any = this.chartHelper[j].name;
      for (let n = 0; n < 24; n++) {
        // 温度要取整
        if (j == 0) {
          tempArray.push(Math.round(data.weatherJson.hourly.data[n][index]));
        }
        // 湿度要*100再取整
        else if (j == 2) {
          tempArray.push(
            Math.round(data.weatherJson.hourly.data[n][index] * 100)
          );
        } else {
          // 其他保留两位小数
          let tempNum = Number(data.weatherJson.hourly.data[n][index]).toFixed(
            2
          );
          tempArray.push(tempNum);
        }
      }
      let tempBarChartData = "barChartData" + j;
      this[tempBarChartData][0].data = tempArray;
      this[tempBarChartData][0].label = index;

      let tempBarChartOptions = "barChartOptions" + j;
      this[tempBarChartOptions].scales.yAxes[0].scaleLabel.labelString =
        this.chartHelper[j].lable;
    }
  }

  // 通过添加日期来得到detailJson
  getDetailJson() {
    // let detailUrl = 'http://localhost:3000/getDetailJson?lat=' + this.myLat + '&lng=' + this.myLng + '&time=1573545600';
    let detailUrl =
      "http://weatherapp-env.eba-uywrnxtt.us-west-1.elasticbeanstalk.com/getDetailJson?lat=" +
      this.myLat +
      "&lng=" +
      this.myLng +
      "&time=1573545600";
    this.http.get(detailUrl).subscribe((response: any) => {
      console.log(response);
    });
  }

  // twitter
  clickTwitter() {
    let text =
      "The current temperature at " +
      this.currentJson.city +
      " is " +
      this.currentJson.weatherJson.currently.temperature +
      "°F. The weather conditions are " +
      this.currentJson.weatherJson.currently.summary +
      ".";
    let url =
      "https://twitter.com/intent/tweet?text=" +
      text +
      "&button_hashtag=WeatherSearch";
    console.log(text);

    this.twitterATag.nativeElement.setAttribute("href", url);
    this.twitterATag.nativeElement.click();
  }

  // favorite  点击星星，不涉及页面切换
  favorite() {
    if (!this.hasbeenFav) {
      this.myService.setCookies(this.currentJson.city, this.currentJson);
      // 设置对应的样式
      this.favoriteImg.nativeElement.innerText = "star";
      this.favoriteImg.nativeElement.style = "font-size:225%; color:goldenrod";
    } else {
      this.myService.removeCookies(this.currentJson.city);

      // 设置对应的样式
      this.favoriteImg.nativeElement.innerText = "star_border";
      this.favoriteImg.nativeElement.style = "font-size:225%;";
    }
    this.hasbeenFav = !this.hasbeenFav;
  }

  //两个按钮 记得加上favor 页面的显示
  showResult() {
    this.noRecord = true;
    if (this.currentJson == "") {
      this.resultBtn.nativeElement.style =
        "background-color: #4A87A7;color:white;";
      this.favoriteBtn.nativeElement.style = "";
      // this.bodyHidden = false;
      this.inFavorite = false;
      return;
    } else if (!this.bodyHidden) {
      this.bodyHidden = false;
      this.inFavorite = false;
      return;
    } else {
      this.resultBtn.nativeElement.style =
        "background-color: #4A87A7;color:white;";
      this.favoriteBtn.nativeElement.style = "";
      this.bodyHidden = false;
      this.inFavorite = false;
    }
  }

  showFavorite() {
    if (this.currentJson == "") {
      this.favoriteBtn.nativeElement.style =
        "background-color: #4A87A7;color:white;";
      this.resultBtn.nativeElement.style = "";
      this.inFavorite = true;
    } else {
      this.bodyHidden = true;
      this.inFavorite = true;
      this.favoriteBtn.nativeElement.style =
        "background-color: #4A87A7;color:white;";
      this.resultBtn.nativeElement.style = "";
    }

    if (localStorage.length == 0) {
      this.showNoRecords();
    } else {
      this.drawTable();
    }

    // this.drawTable();
  }

  // 清空按钮，未完成
  clear() {
    this.showWhichTab = "current";
    this.street = "";
    this.city = "";
    this.state = "Select State";

    this.myLat = "";
    this.myLng = "";
    this.localState = "";
    this.localCity = "";

    this.currentJson = "";
    this.autoFillJson = "";

    this.isChecked = false;
    this.bodyHidden = true;
    this.hiddenProgress = true;
    this.chartIndexValue = "temperature";

    this.autoFillArr = [];

    this.myControl = new FormControl();
    this.hasbeenFav = false;

    this.inFavorite = false;

    this.noRecord = true;
    this.invalidAddress = true;

    this.isDisabled = false;

    // 两个按钮
    this.resultBtn.nativeElement.style =
      "background-color: #4A87A7;color:white;";
    this.favoriteBtn.nativeElement.style = "";

    // fav 标签
    this.favoriteImg.nativeElement.innerText = "star_border";
    this.favoriteImg.nativeElement.style = "font-size:225%;";
  }

  drawTable() {
    for (let i = 0; i < localStorage.length; i++) {
      let city: any = localStorage.key(i);
      let tempJson = this.myService.getCookies(city);

      //颜色
      let trTemp: any = "tr" + i;
      if (i % 2 == 0) {
        this[trTemp].nativeElement.style = "background-color:#7EC6EC;";
      } else {
        this[trTemp].nativeElement.style = "background-color:#4A87A7;";
      }

      // ID
      let idTemp: any = "favId" + i;
      this[idTemp].nativeElement.innerText = i + 1;

      // 图片
      let imgTemp: any = "favImg" + i;
      this[imgTemp].nativeElement.setAttribute("src", tempJson.url);

      //city
      let cityTemp: any = "favCity" + i;
      this[cityTemp].nativeElement.innerHTML =
        '<span style="color: purple;">' + tempJson.city + "</span>";
      this[cityTemp].nativeElement.setAttribute(
        "data-original-title",
        tempJson.city
      );

      //state
      let stateTemp: any = "favState" + i;
      this[stateTemp].nativeElement.innerText = tempJson.state;

      //delete btn
      let deleteTemp: any = "favDelete" + i;
      let html_txt: any = "";
      html_txt +=
        '<button style="border-radius:7px" name="' + tempJson.city + '" >';
      html_txt +=
        '<i name="' +
        tempJson.city +
        '" class="material-icons" style="font-size:200%; color:goldenrod">delete</i></button>';
      this[deleteTemp].nativeElement.innerHTML = html_txt;

      this[deleteTemp].nativeElement.setAttribute("name", tempJson.city);
    }

    for (let n = localStorage.length; n < 5; n++) {
      let trEmpty: any = "tr" + n;
      this[trEmpty].nativeElement.style = "display:none;";
    }
  }

  // 点击收藏出现页面
  showFavContent(e) {
    let cityKey: any = e.target.innerText;
    let myJson: any = this.myService.getCookies(cityKey);
    console.log(myJson);
    this.currentJson = myJson;

    this.showResult();
    this.bodyHidden = true;
    this.progress();

    this.myService.myJson = myJson;
    this.renderMyCard(myJson);
    this.renderHourlyChart(myJson);

    this.showWhichTab = "current";

    // 收藏星星
    this.hasbeenFav = true;
    this.favoriteImg.nativeElement.innerText = "star";
    this.favoriteImg.nativeElement.style = "font-size:225%; color:goldenrod";
  }

  sayHi(e) {
    console.log(e.target);
    console.log(e.target.getAttribute("name"));

    let tempKey: any = e.target.getAttribute("name");
    this.myService.removeCookies(tempKey);

    if (this.currentJson.city == tempKey) {
      this.favoriteImg.nativeElement.innerText = "star_border";
      this.favoriteImg.nativeElement.style = "font-size:225%;";
      this.hasbeenFav = false;
    }

    if (localStorage.length == 0) {
      this.showNoRecords();
    } else {
      setTimeout(() => {
        this.showResult();
        this.showFavorite();
      }, 200);
    }
  }

  // 只显示无记录
  showNoRecords() {
    this.noRecord = false;
    this.inFavorite = false;
    this.bodyHidden = true;
  }

  // 只显示无效地址
  showInvalidAddress() {
    this.invalidAddress = false;
    this.inFavorite = false;
    this.bodyHidden = true;
  }

  // 控制search按钮的显示
  btnIsDisabled() {
    if (this.isChecked) {
      return false;
    } else {
      if (
        this.street == "" ||
        this.city == "" ||
        this.state == "Select State"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
