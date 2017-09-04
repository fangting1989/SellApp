import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  DataList:any = []
  constructor(public navCtrl: NavController) {
    this.DataList = [
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:'./assets/images/cegnzi.png',num:1},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:'./assets/images/cegnzi.png'},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:'./assets/images/cegnzi.png'},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:'./assets/images/cegnzi.png'},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:'./assets/images/cegnzi.png'},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''},
      {name:'物料一',desc:'物理是汉堡的原材料',imgpath:''}
    ]
  } 

  ItemPlusClick(item){

  }

  ItemSubClick(item){

  }

}
