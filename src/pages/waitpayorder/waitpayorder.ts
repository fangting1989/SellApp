import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {WaitpayorderdetailPage} from './../../pages'
import {_} from 'underscore'
import { GlobalState} from './../../app/global.state';

@Component({
  selector: 'page-waitpayorder',
  templateUrl: 'waitpayorder.html',
})
export class WaitpayorderPage {

  DataList:any = [];
  OrderState:any = 0;
  TitleText = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public viewCtrl: ViewController,
    private appctrl:App,
    private _state:GlobalState) {

      this._state.subscribe('OrderPayEvent', (data) => {
        if(data.refresh == true){
          this.loadData();
        }
      })
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.OrderState =  this.navParams.get('state');
    if(this.OrderState == 2){
      this.TitleText = '待审核订单'
    }else if(this.OrderState == 3){
      this.TitleText = '待支付订单'
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
            and:[{formstate:{inq:[this.OrderState]}}]
          },
          order:'formdate DESC'
        }
    }
    this.orderServices.OrderList(PostData).subscribe(result => {
      if (result != null) {
        this.DataList = result;
        _.each(this.DataList,function(obj){
          //加载订单金额
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
    //获得订单金额
    this.orderServices.OrderTotalCountMoney(PostData).subscribe(result => {
      if (result != null && result.errid > 0) {
        item.totalcount = result.data.PROCOUNT;
        item.totalmoney = result.data.TOTALMONEY;
        item.totalquantity = result.data.TOTALQUANTITY;
      }
    })
  }

  //查看详情
  ItemClick(item){
    this.appctrl.getRootNav().push(WaitpayorderdetailPage,{ItemData:item,state:this.OrderState})
  }

}
