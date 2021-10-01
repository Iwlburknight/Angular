// 浏览器解析的模块
import { BrowserModule } from '@angular/platform-browser';
// angular的核心模块
import { NgModule } from '@angular/core';

// 必须要先引用才能使用双向数据绑定
import { FormsModule } from '@angular/forms';

// angular的路由模块
import { AppRoutingModule } from './app-routing.module';
// 根组件模块
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

// 引用并配置服务
import { StorageService } from './services/storage.service';
import { HeaderSonComponent } from './components/header-son/header-son.component';

// 引用内置的请求数据模块
import { HttpClientModule } from '@angular/common/http';

// ng-bootstrap 模块
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// 引用动画模块
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// 引用angular material所需
import {MatAutocompleteModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';


// angular material 所需
import { MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';


// chart JS 所需
import { ChartsModule } from 'ng2-charts';
import { WeeklyChartComponent } from './components/weekly-chart/weekly-chart.component';

// import { NgbdModalBasic } from './modal-basic';


// 这里是一个装饰器，接受一个元数据对象，可以当做一个方法，用来指导angular如何编译和启动
@NgModule({
  declarations: [
    // 配置当前项目运行的组件
    AppComponent,
    NewsComponent,
    HomeComponent,
    SearchComponent,
    HeaderSonComponent,
    WeeklyChartComponent,
  ],
  imports: [
    // 配置当前项目依赖的模块和路由
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    // MatSliderModule,
    MatSelectModule, MatFormFieldModule, MatInputModule,
    ChartsModule,

    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  // 配置当前项目所需要的服务 在providers里面配置
  providers: [StorageService],
  bootstrap: [AppComponent]

})
export class AppModule { }
