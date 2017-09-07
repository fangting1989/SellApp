import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavgationRoutes } from './app.route';
import { AboutPage,ContactPage,HomePage ,TabsPage,LoginpagePage} from '../pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonModule } from '@angular/common';
import { homeServices,loginServices,baseService,comServices} from '../api'
import { HttpModule } from '@angular/http';
var AppComponents = [
  AboutPage,ContactPage,HomePage ,TabsPage,LoginpagePage
]

var AppServices = [
  homeServices,loginServices,baseService,comServices
]

@NgModule({
  declarations: [
    MyApp,
    ...AppComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
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
    ...AppServices
  ]
})
export class AppModule {}
