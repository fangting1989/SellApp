import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-changepwd',
  templateUrl: 'changepwd.html',
})
export class ChangepwdPage {
   model:any = {}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private ViewController:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepwdPage');
  }
  
   cancel(){
    this.ViewController.dismiss()
  }
}
