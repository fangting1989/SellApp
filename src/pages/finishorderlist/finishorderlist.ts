import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {OrderdetailPage} from './../../pages'
import {_} from 'underscore'
@Component({
  selector: 'page-finishorderlist',
  templateUrl: 'finishorderlist.html',
})
export class FinishorderlistPage {
  DataList:any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public viewCtrl: ViewController,
    private appctrl:App) {
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
            and:[{formstate:{inq:[7]}}]
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
      }
    })
  }

  ItemClick(item){
    this.appctrl.getRootNav().push(OrderdetailPage,{ItemData:item})
  }

}
