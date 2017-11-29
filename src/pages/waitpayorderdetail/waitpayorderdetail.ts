import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {_} from 'underscore'
import { GlobalState} from './../../app/global.state';

@Component({
  selector: 'page-waitpayorderdetail',
  templateUrl: 'waitpayorderdetail.html',
})
export class WaitpayorderdetailPage {

   DataList:any = [];
  ItemData:any = {};
  TotalMoney:any = 0;
  TotalQuantity:any=0;
  OrderState:any = 0;
  CanPaying:any = true;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private comServices:comServices,
    private orderServices:orderServices,
    private _state:GlobalState) {
    this.ItemData =  navParams.get('ItemData');
    this.OrderState = navParams.get('state');
    console.log(this.ItemData)
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.loadData()
  }

  loadData(){
    var self = this;
    var PostData = {
        filter:{
          where:{
            and:[{formno:this.ItemData.formno}]
          }
        }
    }
    this.orderServices.OrderDetail(PostData).subscribe(result => {
      if (result != null) {
        this.DataList = result
        _.each(this.DataList,function(obj){
          obj.pro = {}
          self.loadPro(obj)
        })
        this.ResetTotalMoney();
      }
    })
  }

  loadPro(item){
    var PostData = {
        filter:{
          where:{
            and:[{mtcode:item.mtcode}]
          }
        }
    }
    this.orderServices.RecMaterials(PostData).subscribe(result => {
      if (result != null &&result.length > 0) {
        item.pro = result[0]
      }
    })
  }

  ResetTotalMoney(){
    var self = this;
    this.TotalMoney = 0;
    _.each(this.DataList,function(obj){
      self.TotalMoney += obj.saleamount
      self.TotalQuantity += obj.quantity
    })
  }

  PayMoney(){
    if(!this.CanPaying){
      return
    }
    this.CanPaying = false;

    var PostData = {
        where:{
          and:[{formno:this.ItemData.formno}]
        }
    }
    var model = {
      formstate:4
    }
    this.orderServices.UpdateOrder(PostData,model).subscribe(result => {
      this.CanPaying = true;
      if (result != null &&result.count > 0) {
        this.comServices.TipInfo("支付成功!")
        //发送刷新页面
        this._state.notifyDataChanged('OrderPayEvent', {refresh:true})
        this.navCtrl.pop();
      }
    })
  }

}
