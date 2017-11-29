import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {FixorderPage} from './../../pages'
import {_} from 'underscore'
import { GlobalState} from './../../app/global.state';

@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {
   DataList:any = [];
   OrderState:any = 0;
  TitleText = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private comServices:comServices,
    private orderServices:orderServices,
    private appctrl:App,
    private _state:GlobalState
    ) {
      this._state.subscribe('OrderSHEvent', (data) => {
        if(data.refresh == true){
          this.loadData();
        }
      })

  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.OrderState =  this.navParams.get('state');
    if(this.OrderState.length == 2){
      this.TitleText = '待收货订单'
    }else if(this.OrderState.length == 1){
      if(this.OrderState[0] == 6){
        this.TitleText = '部分收货订单'
      }else{
      this.TitleText = '待收货订单'
      }
    }else{
      this.TitleText = ''
    }
    this.loadData();
  }

  loadData(){
    var self = this;
    var PostData = {
        filter:{
          where:{
            and:[{formstate:{inq:this.OrderState}}]
          },
          order:'formdate DESC'
        }
    }
    this.orderServices.OrderList(PostData).subscribe(result => {
      if (result != null) {
        this.DataList = result;
        _.each(this.DataList,function(obj){
          self.loadItemCountMoney(obj)
        })
      }
    })
  }

  loadItemCountMoney(item){
    var PostData = {
        data:{
          formno:item.formno
        }
    }
    this.orderServices.OrderTotalCountMoney(PostData).subscribe(result => {
      if (result != null && result.errid > 0) {
        item.totalcount = result.data.PROCOUNT;
        item.totalmoney = result.data.TOTALMONEY;
        item.totalquantity = result.data.TOTALQUANTITY;
      }
    })
  }

  ItemClick(item){
    //财务确认无法点击进入
    if(item.formstate == 4){
      this.comServices.TipInfo("财务确认中..")
      return;
    }
    this.appctrl.getRootNav().push(FixorderPage,{ItemData:item,state:item.formstate})
  }
}
