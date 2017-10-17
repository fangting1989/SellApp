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
  constructor(private _state:GlobalState) {
  }
  
//初次加载时
ionViewDidEnter() {
 }

  reload(){
     this._state.notifyDataChanged('OrderPayEvent',{refresh:true})
  }
}
