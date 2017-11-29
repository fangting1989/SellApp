import { Component,ViewChild, } from '@angular/core';
import {Tabs} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {CartorderPage } from  '../cartorder/cartorder'
import { GlobalState} from './../../app/global.state';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import { _ } from 'underscore'
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CartorderPage;
  SelDataList:any = [];
  ordercount:any = 0;
  // tab4Root
  constructor(private _state:GlobalState,
    private CoolLocalStorage:CoolLocalStorage) {
    this._state.subscribe('CartOrderChanged', (data) => {
      this.SelDataList = (Object)(this.CoolLocalStorage.getObject(WebConfig.cartkeyName))
      if(this.SelDataList.length == 0){
        this.ordercount = ''
      }else{
        this.ordercount =this.SelDataList.length
      }
    })
    this._state.subscribe('CartOrderChanged2', (data) => {
      this.SelDataList = (Object)(this.CoolLocalStorage.getObject(WebConfig.cartkeyName))
      if(this.SelDataList.length == 0){
        this.ordercount = ''
      }else{
        this.ordercount =this.SelDataList.length
      }
    })
    this.SelDataList = (Object)(this.CoolLocalStorage.getObject(WebConfig.cartkeyName))
    if( Object.prototype.toString.call(this.SelDataList)!='[object Array]' ){
      this.ordercount = ''
    }else{
      if(this.SelDataList.length == 0){
        this.ordercount = ''
      }else{
        this.ordercount =this.SelDataList.length
      }
    }
  }
  
//初次加载时
ionViewDidEnter() {
 }

  reload(){
     this._state.notifyDataChanged('OrderPayEvent',{refresh:true})
  }
}
