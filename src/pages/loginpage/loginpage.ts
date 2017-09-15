import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {loginServices,comServices} from '../../api'
import {TabsPage} from '../../pages'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage{
// 
  model:any = {}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loginServices:loginServices,
    private comServices:comServices,
    private CoolLocalStorage:CoolLocalStorage
    ) {
  }

  ionViewDidLoad() {
    
  }

  LoginClick(){
    if(!this.model.username || !this.model.pwd){
         this.comServices.TipInfo("请输入账户密码")
         return;
    }
    var PostData = {
        filter:{
          where:{
            and:[{clientcode:this.model.username},{pwd:this.model.pwd}]
          }
        }
    }
    this.loginServices.UserLogin(PostData).subscribe(result => {
      if (result != null) {
        if(result.length != 1 ){
          this.comServices.TipInfo("对不起,找不到您的账户信息")
        }else{
          //记录本地信息
          var obj = result[0]
          this.CoolLocalStorage.setObject(WebConfig.cookieKeyName,obj);
          this.navCtrl.push(TabsPage);
        }
      }
    })
  }



}
