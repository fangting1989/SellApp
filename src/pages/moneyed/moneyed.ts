import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-moneyed',
  templateUrl: 'moneyed.html',
})
export class MoneyedPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private ViewController:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyedPage');
  }

  cancel(){
    this.ViewController.dismiss()
  }

}
