import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {_} from 'underscore'
import {FixorderitemPage} from './../../pages'
import { GlobalState} from './../../app/global.state';
@Component({
  selector: 'page-fixorder',
  templateUrl: 'fixorder.html',
})
export class FixorderPage {
  DataList:any = [];
  ItemData:any = {};
  TotalMoney:any = 0;
  OrderState:any = 0;
  CanSubmit:any = true;
  TotalQuantity:any = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private comServices:comServices,
    private orderServices:orderServices,
    public modalCtrl: ModalController,
    private _state:GlobalState) {
    this.ItemData =  navParams.get('ItemData');
    this.OrderState =  navParams.get('state');
    console.log( this.OrderState)
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.loadData();
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
          if(self.OrderState == 5){
            obj.sendquantity =obj.quantity
          }
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

  ItemClick(item){
    //
    let PreorderPageModal = this.modalCtrl.create(FixorderitemPage, {OrderData:item});
      PreorderPageModal.present();
  }

  ResetTotalMoney(){
    var self = this;
    this.TotalMoney = 0;
    _.each(this.DataList,function(obj){
      self.TotalMoney += obj.saleamount
      self.TotalQuantity += obj.quantity;
    })
  }

  //全部收货
  AllPro(){
    var self = this;
    var opt = {
      title:'提示',
      message:'是否确认全部收货',
      SureCallBack:()=>{
        self.AllProFun();
      }
    }
    this.comServices.ConfirmInfo(opt)
  }

  AllProFun(){
    if(!this.CanSubmit){
      return 
    }
    this.CanSubmit = false;
    var PostData = {
        data:{
          formno:this.ItemData.formno
        }
    }
    this.orderServices.OrderAllPro(PostData).subscribe(result => {
      this.CanSubmit = true;
      if (result != null &&result.errid > 0) {
        //
        this.comServices.TipInfo("全部收货成功!")
        this._state.notifyDataChanged('OrderSHEvent', {refresh:true})
        this.navCtrl.pop();
      }
    })
  }
  //部分收货
  PartPro(){
    var self = this;
    var opt = {
      title:'提示',
      message:'是否确认全部收货',
      SureCallBack:()=>{
        self.PartProFun();
      }
    }
    this.comServices.ConfirmInfo(opt)
  }

  PartProFun(){
    if(!this.CanSubmit){
      return 
    }
    this.CanSubmit = false;
    _.each(this.DataList,function(obj){
      obj.selnum = obj.sendquantity
    })
    var PostData = {
        data:{
          formno:this.ItemData.formno,
          list:this.DataList
        }
    }
    this.orderServices.OrderPartPro(PostData).subscribe(result => {
      this.CanSubmit = true;
      if (result != null &&result.errid > 0) {
        this.comServices.TipInfo("部分收货成功!")
        this._state.notifyDataChanged('OrderSHEvent', {refresh:true})
        this.navCtrl.pop();
      }
    })
  }
}
