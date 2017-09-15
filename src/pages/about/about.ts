import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { GlobalState} from './../../app/global.state';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import { _ } from 'underscore'
import {PreorderPage} from '../../pages'
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  DataList:any = []
  UserData:any;
  TotalPrice:any = 0;
  constructor(public navCtrl: NavController,
    private _state:GlobalState,
    private CoolLocalStorage: CoolLocalStorage,
      public modalCtrl: ModalController) {

     //UserData
     var objQYObject = { name: null, memberID: null }
    this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
  } 

  ItemPlusClick(item){
    item.selnum ++
    this.ReSetTotalPrice()
  }

  ItemSubClick(item){
    if(item.selnum <= 0){
      //this.comServices.TipInfo("对不起不能小于0")
      return
    }else{
      item.selnum --
      this._state.notifyDataChanged('OrderChange', item)
    }
    this.ReSetTotalPrice()
  }


  ionViewDidLoad() {
      var self = this;
      this._state.subscribe('OrderChange', (data) => {
        var findflag = false;
        _.each(self.DataList,function(obj){
          if(obj.mtcode == data.mtcode){
            findflag = true;
          }
        })
        if(!findflag){
          switch(self.UserData.clienttype){
            case 1:
              data.price = data.sendprice1; 
              break;
            case 2:
              data.price = data.sendprice2; 
            break;
            case 3:
              data.price = data.sendprice3; 
            break;
          }
          data.selnum = 1
          self.DataList.push(data)
          self.ReSetTotalPrice()
        }
         
      });
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
      PreorderPageModal.present();
  }

}
