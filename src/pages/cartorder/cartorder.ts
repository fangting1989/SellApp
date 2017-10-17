import { Component,ChangeDetectorRef  } from '@angular/core';
import { NavController,ModalController,NavParams,ViewController,AlertController  } from 'ionic-angular';
import { GlobalState} from './../../app/global.state';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import { _ } from 'underscore'
import {PreorderPage} from '../../pages'
import * as Jquery from 'jquery'
@Component({
  selector: 'page-cartorder',
  templateUrl: 'cartorder.html',
})
export class CartorderPage {

   DataList:any = []
  UserData:any;
  TotalPrice:any = 0;
  constructor(public navCtrl: NavController,
    private _state:GlobalState,
    private CoolLocalStorage: CoolLocalStorage,
      public modalCtrl: ModalController,
      private navParams:NavParams,
      public viewCtrl: ViewController,
      public cd: ChangeDetectorRef,
      private alertCtrl: AlertController) {

     //UserData
     var objQYObject = { name: null, memberID: null }
    this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
  } 

  ItemPlusClick(item){
    item.selnum ++
    this.ReSetTotalPrice()
  }

  ItemSubClick(item){
    if(item.selnum <= 1){
      let alert = this.alertCtrl.create({
          title: '提示',
          message: '是否删除对应的内容?',
          buttons: [
            {
              text: '取消',
              role: '取消',
              handler: () => {
                return;
              }
            },
            {
              text: '确定',
              handler: () => {
                var index = _.indexOf(this.DataList,item)
                if(index > -1){
                  this.DataList.splice(index,1)
                }
              }
            }
          ]
        });
        alert.present();
      return
    }else{
      item.selnum --
      this._state.notifyDataChanged('OrderChange', item)
    }
    this.ReSetTotalPrice()
  }
  DataItemNumChange(item,e){
    if(isNaN(item.selnum) || item.selnum == ''){
      item.selnum = 1
    }
    this.ReSetTotalPrice()
  }

  Blur(item,e){
    if(e.target.value == ''){
       e.target.value = 1
       item.selnum = 1
    }
    this.ReSetTotalPrice()
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
      var self = this;
      this.DataList = this.navParams.get('DataList');
       this.ReSetTotalPrice()
  }

  ReSetTotalPrice(){
    var self = this;
    self.TotalPrice = 0;
    _.each(this.DataList,function(obj){
      self.TotalPrice += obj.price * obj.selnum;
    })
  }

  PreOrder(){
      let PreorderPageModal = this.modalCtrl.create(PreorderPage, {OrderList:this.DataList});

      PreorderPageModal.onDidDismiss(data => {
        if(data && data.order == 'success'){
          //订单完成，清空数据，并跳转到首页
          this._state.notifyDataChanged('ClearOrderChange',{})
          this.navCtrl.pop();
        }
      });

      PreorderPageModal.present();
  }

}
