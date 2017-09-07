import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{_} from 'underscore'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListType:any = [
    {text:'推荐分类',active:true},
    {text:'新品推荐'},
    {text:'物料类别'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'},
    {text:'推荐分类'}
    ];
  shouldShowCancel:any = false
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

  TypeClick(it){
      _.each(this.ListType,function(item){
        item.active = false;
      })
      it.active = true
  }

  ItemPlusClick(item){

  }

  ItemSubClick(item){

  }




  // LoadData(e) {
  //   this.canLoad = false;
  //   if (e == 'reload') {
  //     this.PageNum = 0;
  //     this.DataList = [];
  //     this.CanLoadMore = true;
  //   }
  //   this.PageNum++
  //   var PostData = {
  //     pagenum: this.PageNum,
  //     pagesize: this.PageSize,
  //     name: this.data.searchText,
  //     districtId: this.SelectRegionCode
  //   }
  //   this.agencyServices.findAgency(PostData).subscribe(result => {
  //     if (result != null) {
  //       this.canLoad = true;
  //       if (result.data.length == 0) {
  //         this.CanLoadMore = false;
  //       }
  //       var self = this;
  //       _.each(result.data, function (obj) {
  //         self.DataList.push(obj)
  //       })
  //     }
  //   })
  // }

  // doLoadData(infiniteScroll) {
  //   setTimeout(() => {
  //     this.LoadData('load')
  //     infiniteScroll.complete();
  //   }, 500);
  // }


}
