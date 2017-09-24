import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {OrderdetailPage} from './../../pages'
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
    var PostData = {
        filter:{
          where:{
            and:[{formstate:{inq:[7]}}]
          }
        }
    }
    this.orderServices.OrderList(PostData).subscribe(result => {
      if (result != null) {
        this.DataList = result;
      }
    })
  }

  ItemClick(item){
    this.appctrl.getRootNav().push(OrderdetailPage,{ItemData:item})
  }

}
