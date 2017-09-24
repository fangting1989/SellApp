import { Component,ViewChild, } from '@angular/core';
import {Tabs} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalState} from './../../app/global.state';
import { _ } from 'underscore'
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tabBadgeCount:any='';
  DataList:any=[]
  constructor(private _state:GlobalState) {
    var self = this;
      this._state.subscribe('OrderChange', (data) => {
        console.log(data)
        var findflag = false;
        _.each(self.DataList,function(obj){
          if(obj.mtcode == data.mtcode){
            findflag = true;
          }
        })
        if(!findflag){
          self.DataList.push(data)
        }
        if(self.DataList == 0){
          self.tabBadgeCount = ""
        }else{
          self.tabBadgeCount = self.DataList.length
        }
      });

       this._state.subscribe('ClearOrder', (data) => {
        self.DataList = [];
        self.tabBadgeCount = 0      
      });
  }
  
//初次加载时
ionViewDidEnter() {
  console.log(this.tabRef)
  //设置选项卡的索引值为2，即最后一个
  this.tabRef.select(1);
  var self = this;
  setTimeout(function(){
    self.tabRef.select(0);
  },50)
 }
}
