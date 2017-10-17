import { Component } from '@angular/core';
import { NavController, NavParams ,App ,ModalController} from 'ionic-angular';
import {comServices,orderServices} from '../../api'
import {ChangepwdPage,MoneyedPage,AccountsPage} from '../../pages'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  model:any;
  WaitCount:any = 0;
  UserData:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private comServices:comServices,
    private orderServices:orderServices,
    public appctrl: App,
    private CoolLocalStorage:CoolLocalStorage,
    public modalCtrl: ModalController) {
    
      this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
  }
  ionViewDidLoad() {
    this.InitData()
    console.log(this.UserData)
  }

  InitData(){
    
  }

  ChangePwd(){
    let ChangepwdPageModal = this.modalCtrl.create(ChangepwdPage);
      ChangepwdPageModal.present();
  }

  ShowED(){
    let MoneyedPageModal = this.modalCtrl.create(MoneyedPage);
      MoneyedPageModal.present();
  }

  ShowAccount(){
    let AccountPageModal = this.modalCtrl.create(AccountsPage);
    AccountPageModal.present();
  }
  
}
