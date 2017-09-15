import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { _ } from 'underscore'
import { homeServices, comServices } from '../../api'
import { TabsPage } from '../../pages'
import { GlobalState} from './../../app/global.state';
import * as $ from "jquery";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListType: any = [];
  shouldShowCancel: any = false
  DataList: any = []
  constructor(public navCtrl: NavController,
    private homeServices: homeServices,
    private comServices:comServices,
    private _state:GlobalState) {

      this.initFly();
  }

  TypeClick(it) {
    _.each(this.ListType, function (item) {
      item.active = false;
    })
    it.active = true

    this.loadData(it.clscode)
  }
  loadType() {
    var postData = {}
    this.homeServices.DocMatcls(postData).subscribe(result => {
      if (result != null) {
        this.ListType = result;
        console.log(result)
        if(this.ListType.length > 0){
          this.loadData(this.ListType[0].clscode)
        }
      }
    })
  }
  loadData(clscode){
    var postData = {
      filter:{
        where:{
          and:[{clscode:clscode},{useflag:1}]
        }
      }
    }
    this.homeServices.RecMaterials(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result;
        _.each(this.DataList,function(obj){
          obj.selnum = 0
          obj.imgpath = './assets/images/cegnzi.png'
        })
        console.log(this.DataList)
      }
    })
  }

ionViewDidLoad() {
    this.loadType();
}

ItemPlusClick(e,item){
   this.fly($(e.target));
  //item.selnum ++
  this._state.notifyDataChanged('OrderChange', item)
}

ItemSubClick(item){
  if(item.selnum <= 0){
    //this.comServices.TipInfo("对不起不能小于0")
    return
  }else{
     item.selnum --
     this._state.notifyDataChanged('OrderChange', item)
  }
}


initFly(){
  //预设5个抛物点
  let $pointDiv = $('<div id="pointDivs">').appendTo('body');
  for(let i = 0;i<5;i++){
      $('<div class="point-outer point-pre"><div class="point-inner"/></div>').appendTo($pointDiv);
  }
 }
 fly(e){
  //获取开始点坐标
  let startOffset = $(e).offset();
  //获取结束点坐标
  let ClientWidth = document.body.clientWidth
  let endTop = window.innerHeight - 30, endLeft = ClientWidth/2,left = startOffset.left+10,top = startOffset.top+10;
  let outer = $('#pointDivs .point-pre').first().removeClass("point-pre").css({left:left+'px',top:top+'px'});
  let inner = outer.find(".point-inner");
  setTimeout(function(){
    outer[0].style.webkitTransform = 'translate3d(0,'+(endTop - top)+'px,0)';
    inner[0].style.webkitTransform = 'translate3d('+(endLeft - left)+'px,0,0)';
    setTimeout(function(){
      outer.removeAttr("style").addClass("point-pre");
      inner.removeAttr("style");
      $(".allnum").addClass("animation");
      setTimeout(function(){
        $(".allnum").removeClass("animation");
      },400);
    },350);
  },0);
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
