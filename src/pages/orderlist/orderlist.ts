import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,App } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {FixorderPage} from './../../pages'
@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {
   DataList:any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private comServices:comServices,
    private orderServices:orderServices,
    private appctrl:App
    ) {
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.loadData();
  }

  loadData(){
    var PostData = {
        filter:{
          where:{
            and:[{formstate:{inq:[5,6]}}]
          }
        }
    }
    this.orderServices.OrderList(PostData).subscribe(result => {
      if (result != null) {
        console.log(result)
        this.DataList = result;
      }
    })
  }

  ItemClick(item){
    this.appctrl.getRootNav().push(FixorderPage,{ItemData:item})
  }
}
