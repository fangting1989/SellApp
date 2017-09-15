import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavgationRoutes } from './app.route';
import { AboutPage,ContactPage,HomePage ,TabsPage,LoginpagePage,
    PreorderPage} from '../pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonModule } from '@angular/common';
import { CoolStorageModule } from 'angular2-cool-storage';
import { homeServices,loginServices,baseService,comServices,orderServices} from '../api'
import { HttpModule } from '@angular/http';
var AppComponents = [
  AboutPage,ContactPage,HomePage ,TabsPage,LoginpagePage,
  PreorderPage
]

var AppServices = [
  homeServices,loginServices,baseService,comServices,orderServices
]

import { GlobalState } from './global.state';
const APP_PROVIDERS = [
  GlobalState
];
@NgModule({
  declarations: [
    MyApp,
    ...AppComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    CoolStorageModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',

    }, {
        links: NavgationRoutes
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...AppComponents
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...AppServices,
    ...APP_PROVIDERS
  ]
})
export class AppModule {}
