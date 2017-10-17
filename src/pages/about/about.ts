import { Component } from '@angular/core';
import { NavController, NavParams ,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {FinishorderlistPage,OrderlistPage,WaitpayorderPage} from '../../pages'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import { GlobalState} from './../../app/global.state';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  model:any;
  WaitCount:any = 0;
  UserData:any;
  WaitPayCount:any = 0;
  WaitSureCount:any = 0;
  WaitPartCount:any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public appctrl: App,
    private CoolLocalStorage:CoolLocalStorage,
    private _state:GlobalState) {
    
      this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))

      this._state.subscribe('OrderPayEvent', (data) => {
        if(data.refresh == true){
          this.InitData();
        }
      })

      this._state.subscribe('OrderSHEvent', (data) => {
        if(data.refresh == true){
          this.InitData();
        }
      })
  }
  ionViewDidLoad() {
    console.log("load contact")
    this.InitData()
  }

  InitData(){
    //待确认
    this.LoadWaitSureOrderCount()
    //待收货
    this.LoadWaitOrderCount()
    //待支付
    this.LoadWaitPayOrderCount()
    //待仓库补发
    this.LoadWaitPartOrderCount()
  }

  doRefresh(refresher) {
    this.InitData()
    setTimeout(function(){
      refresher.complete();
    },2000)
  }

  
  //已完成订单
  FinshOrder(){
    this.appctrl.getRootNav().push(FinishorderlistPage)
  }

  //待确认订单
  WaitSureOrder(){
    if(this.WaitSureCount == 0)
      return;
    this.appctrl.getRootNav().push(WaitpayorderPage,{state:2})
  }
  //待支付订单
  WaitPayOrder(){
    if(this.WaitPayCount == 0)
      return;
    this.appctrl.getRootNav().push(WaitpayorderPage,{state:3})
  }
  //待收货订单
  WaitOrder(){
    if(this.WaitCount == 0)
      return;
    this.appctrl.getRootNav().push(OrderlistPage,{state:[4,5]})
  }
  //等待补发
  WaitPartOrder(){
    if(this.WaitPartCount == 0)
      return;
    this.appctrl.getRootNav().push(OrderlistPage,{state:[6]})
  }
  //待确认订单
  LoadWaitSureOrderCount(){
    var PostData = {
      where:{
        and:[{formstate:{inq:[2]}},{clientcode:this.UserData.clientcode}]
      }
    }
    this.orderServices.OrderCount(PostData).subscribe(result => {
      if (result != null) {
        this.WaitSureCount = result.count
      }
    })
  }
  //等待支付
  LoadWaitPayOrderCount(){
    var PostData = {
      where:{
        and:[{formstate:{inq:[3]}},{clientcode:this.UserData.clientcode}]
      }
    }
    this.orderServices.OrderCount(PostData).subscribe(result => {
      if (result != null) {
        this.WaitPayCount = result.count
      }
    })
  }
  //等待签收单据 包含财务确认
  LoadWaitOrderCount(){
    var PostData = {
      where:{
        and:[{formstate:{inq:[4,5]}},{clientcode:this.UserData.clientcode}]
      }
    }
    this.orderServices.OrderCount(PostData).subscribe(result => {
      if (result != null) {
        this.WaitCount = result.count
      }
    })
  }
  //部分签收
  LoadWaitPartOrderCount(){
    var PostData = {
      where:{
        and:[{formstate:{inq:[6]}},{clientcode:this.UserData.clientcode}]
      }
    }
    this.orderServices.OrderCount(PostData).subscribe(result => {
      if (result != null) {
        this.WaitPartCount = result.count
      }
    })
  }
}
