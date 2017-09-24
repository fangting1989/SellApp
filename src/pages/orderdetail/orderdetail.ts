import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {_} from 'underscore'
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  DataList:any = [];
  ItemData:any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private comServices:comServices,
    private orderServices:orderServices) {
    this.ItemData =  navParams.get('ItemData');
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

}
