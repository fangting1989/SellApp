import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { _ } from 'underscore'
import { homeServices, comServices } from '../../api'
import { TabsPage } from '../../pages'
import { GlobalState} from './../../app/global.state';
import * as $ from "jquery";
import { CoolLocalStorage } from 'angular2-cool-storage';
import { WebConfig } from './../../config/config'
import {CartorderPage} from '../../pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListType: any = [];
  shouldShowCancel: any = false
  DataList: any = []
  SelDataList:any = [];
  UserData:any = {};
  constructor(public navCtrl: NavController,
    private homeServices: homeServices,
    private comServices:comServices,
    private _state:GlobalState,
    private CoolLocalStorage:CoolLocalStorage) {

      this.initFly();
    this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
    //清空内容
    this._state.subscribe('ClearOrderChange', (data) => {
        this.SelDataList = []
    })
    //ClearOrderChange
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
    var self = this;
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

          switch(self.UserData.clienttype){
            case 1:
              obj.price = obj.sendprice1; 
              break;
            case 2:
              obj.price = obj.sendprice2; 
            break;
            case 3:
              obj.price = obj.sendprice3; 
            break;
          }

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
  var self = this;
  var findflag = false;
    _.each(self.SelDataList,function(obj){
      if(obj.mtcode == item.mtcode){
        findflag = true;
      }
    })
    if(!findflag){
      switch(self.UserData.clienttype){
        case 1:
          item.price = item.sendprice1; 
          break;
        case 2:
          item.price = item.sendprice2; 
        break;
        case 3:
          item.price = item.sendprice3; 
        break;
      }
      item.selnum = 1
      self.SelDataList.push(item)
    }
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

CartOrder(){
  if(this.SelDataList.length == 0){
    return
  }
  this.navCtrl.push(CartorderPage,{DataList:this.SelDataList})
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
  let endTop = window.innerHeight - 90, endLeft =40,left = startOffset.left+10,top = startOffset.top+10;
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
