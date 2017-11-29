import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { _ } from 'underscore'
import {orderServices,comServices} from '../../api'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import {TabsPage} from '../../pages'
@Component({
  selector: 'page-preorder',
  templateUrl: 'preorder.html',
})
export class PreorderPage {
  DataList:any;
  TotalPrice:any = 0;
  CanLoadding:any =true;
  UserData:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private orderServices:orderServices,
    private comServices:comServices,
    private CoolLocalStorage: CoolLocalStorage,
    private ViewController:ViewController) {
    this.DataList =  navParams.get('OrderList');
    this.ReSetTotalPrice()
    var objQYObject = { name: null, memberID: null }
    this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
  }

  ionViewDidLoad() {
    
  }

  backPage(){

  }

  ReSetTotalPrice(){
    var self = this;
    self.TotalPrice = 0;
    _.each(this.DataList,function(obj){
      self.TotalPrice += obj.price * obj.selnum;
    })
  }

  SureOrder(){
    var self = this
    if(!this.CanLoadding)
      return;
    this.CanLoadding = false;
    var postData = {
      data:{
        clientcode:this.UserData.clientcode,
        orderlist:this.DataList
      }
    }

    this.orderServices.SureOrder(postData).subscribe(result => {
      if (result != null) {
        if(result.errid > 0){
          this.comServices.TipInfo("订单下单成功！")
          setTimeout(function(){
             self.ViewController.dismiss({order:'success'});
          },1500)
          //清空内容
          this.CoolLocalStorage.setObject(WebConfig.cartkeyName,[])
        }
      }
    })
  }
}
