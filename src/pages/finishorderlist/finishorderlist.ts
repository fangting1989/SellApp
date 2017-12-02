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
  model:any = {}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public viewCtrl: ViewController,
    private appctrl:App) {
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.model.startdate = "2011-01-01"
    this.loadData();
    // this.model.startdate = new dateDataSortValue()
  }

  loadData(){
    var self = this;
    var PostData:any = {
    }
    if(this.model.searchtext != "" && typeof this.model.searchtext != "undefined"){
      PostData.searchtext = this.model.searchtext;
    }
    if(this.model.startdate){
      PostData.startdate = this.model.startdate
    }
    if(this.model.enddate){
      PostData.enddate = this.model.enddate
    }
    this.orderServices.OrderListN({data:PostData}).subscribe(result => {
      if (result != null) {
        this.DataList = result.data;
        _.each(this.DataList,function(obj){
          self.loadItemCountMoney(obj)
        })
      }
    })
  }

  loadItemCountMoney(item){
    var PostData = {
        data:{
          formno:item.FormNo
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
    this.appctrl.getRootNav().push(OrderdetailPage,{ItemData:item})
  }

  getItems(e){
    this.loadData()
  }

  modelchange(e,obj){
    var self = this;
    console.log(obj)
    console.log(e)
    setTimeout(() => {
      if(this.model.startdate != null && this.model.enddate != null){
        if(new Date(this.model.startdate) > new Date(this.model.enddate)){
          self.comServices.TipInfo("对不起,请选择正确的时间")
          if(this.model.startdate == e){
            this.model.startdate = null
          }else{
            this.model.enddate = null
          }
        }
      }
      self.loadData()
    }, 800);
   
  }

}
