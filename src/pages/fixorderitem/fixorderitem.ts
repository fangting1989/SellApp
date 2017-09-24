import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-fixorderitem',
  templateUrl: 'fixorderitem.html',
})
export class FixorderitemPage {
  form:any = {}
  currentItem:any = {}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixorderitemPage');
  }

  closemodal(){
    this.viewCtrl.dismiss();
  }
}
