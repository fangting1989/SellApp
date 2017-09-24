import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {_} from 'underscore'
import {FixorderitemPage} from './../../pages'
@Component({
  selector: 'page-fixorder',
  templateUrl: 'fixorder.html',
})
export class FixorderPage {
  DataList:any = [];
  ItemData:any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private comServices:comServices,
    private orderServices:orderServices,
    public modalCtrl: ModalController) {
    this.ItemData =  navParams.get('ItemData');
    console.log(this.ItemData)
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

  ItemClick(item){
    //
    let PreorderPageModal = this.modalCtrl.create(FixorderitemPage, {OrderList:this.DataList});
      PreorderPageModal.present();
  }
}
