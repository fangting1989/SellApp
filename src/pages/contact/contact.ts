import { Component } from '@angular/core';
import { NavController, NavParams ,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {FinishorderlistPage,OrderlistPage} from '../../pages'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  model:any;
  WaitCount:any = 0;
  UserData:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public appctrl: App,
    private CoolLocalStorage:CoolLocalStorage) {
    
      this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
  }
  ionViewDidLoad() {
    console.log("load contact")
    this.InitData()
  }

  InitData(){
    this.LoadWaitOrderCount()
  }

  LoadWaitOrderCount(){
    
    var PostData = {
      where:{
        and:[{formstate:{inq:[5,6]}},{clientcode:this.UserData.clientcode}]
      }
    }
    this.orderServices.OrderCount(PostData).subscribe(result => {
      if (result != null) {
        this.WaitCount = result.count
      }
    })
  }

  FinshOrder(){
    this.appctrl.getRootNav().push(FinishorderlistPage)
  }

  WaitOrder(){
    this.appctrl.getRootNav().push(OrderlistPage)
  }
}
