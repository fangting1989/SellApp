import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {comServices,orderServices} from '../../api'
@Component({
  selector: 'page-fixorderitem',
  templateUrl: 'fixorderitem.html',
})
export class FixorderitemPage {
  form:any = {}
  currentItem:any = {}
  SelCount:any = 0;
  TotalCount:any = 0;
  OrderData :any = {
    pro:{}
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private comServices:comServices) {
      
  }

  ionViewDidLoad() {
    this.OrderData =  this.navParams.get('OrderData');
    console.log(this.OrderData)
    console.log(this.OrderData.sendquantity)
    this.SelCount = this.OrderData.sendquantity
    this.TotalCount = this.OrderData.quantity
  }

  closemodal(){
    this.viewCtrl.dismiss();
  }

  KeyBoardOKClick(){
    if(this.SelCount.length >0 && isNaN(this.SelCount)){
      this.comServices.TipInfo("请输入正确的数字")
    }else if(this.SelCount.length == 0){
      this.viewCtrl.dismiss();
    }else if(parseFloat(this.SelCount) > this.OrderData.quantity || parseFloat(this.SelCount) < 0 ){
      this.comServices.TipInfo("对不起，数量不能大于订货数量")
    }
    else{
      this.OrderData.sendquantity =  parseFloat(this.SelCount)
      this.viewCtrl.dismiss();
    }
     
  }

  selected(d){
    var datastring = this.SelCount + ""
    if(d == 'remove'){ 
        // if(this.SelCount.charAt(this.SelCount.length-2) == '.'){
        //     this.SelCount = this.SelCount.substring(0,this.SelCount.length-2)
        // }else{
          console.log(this.SelCount)
          this.SelCount = datastring.substring(0,datastring.length-1)
        // }
    }else{
        if (this.SelCount.toString().indexOf('.') != '-1' && d == '.') {
            return false
        }
        if(this.SelCount.toString().indexOf('.') != '-1' &&  ((this.SelCount.toString().length - 1) - this.SelCount.toString().indexOf('.')) >= 2){
          return false
        }
        if(this.SelCount.length >10){
            return false
        }
        this.SelCount += d.toString()    
    }
  }
}
