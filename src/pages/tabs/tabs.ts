import { Component,ViewChild, } from '@angular/core';
import {Tabs} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {
    
  }
  
//初次加载时
ionViewDidEnter() {
  console.log("1-2-3-4")
  //设置选项卡的索引值为2，即最后一个
  this.tabRef.select(0);
 }
}
