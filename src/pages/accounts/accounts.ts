import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AccountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private ViewController:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

   cancel(){
    this.ViewController.dismiss()
  }

}
