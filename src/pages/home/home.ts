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
import * as Rx from 'rxjs/Rx';
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
  CartDataList = {};
  model:any = {};
  constructor(public navCtrl: NavController,
    private homeServices: homeServices,
    private comServices:comServices,
    private _state:GlobalState,
    private CoolLocalStorage:CoolLocalStorage) {
      var self = this;
      this._state.subscribe('CartOrderChanged2', (data) => {
        this.SelDataList = (Object)(this.CoolLocalStorage.getObject(WebConfig.cartkeyName))
        if( Object.prototype.toString.call(this.SelDataList)!='[object Array]' ){
          this.SelDataList = []
        }
        console.log( this.SelDataList)
        //将内容更新到对应的数据中
        _.each(self.DataList,function(obj){
          var hasflag = false;
          _.each(self.SelDataList,function(selobj){
            if(obj.mtcode == selobj.mtcode){
              obj.selnum = selobj.selnum
              hasflag = true
            }
          })
          if(!hasflag){
            //如果删除或者没有选择将数据重置成0
            obj.selnum = 0
          }
        })
      })
      this.SelDataList = (Object)(this.CoolLocalStorage.getObject(WebConfig.cartkeyName))
      if( Object.prototype.toString.call(this.SelDataList)!='[object Array]' ){
        this.SelDataList = []
      }
      this.initFly();
    this.UserData = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
    //清空内容
    // this._state.subscribe('ClearOrderChange', (data) => {
    //     this.SelDataList = []
    // })
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
    var postData = null
    postData = {
      filter:{
        where:{
          and:[{useflag:1}]
        }
      }
    }
    if(clscode){
      postData.filter.where.and.push({clscode:clscode})
    }
    if(this.model.searchtext != null && this.model.searchtext!= ""){
      postData.filter.where.and.push({mtname:{like:"%"+this.model.searchtext+"%"}})
    }
    
    this.homeServices.RecMaterials(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result;
        _.each(this.DataList,function(obj){
          //判断是否选择
          obj.selnum = 0
          _.each(self.SelDataList,function(selobj){
            if(obj.mtcode == selobj.mtcode){
              obj.selnum = selobj.selnum
            }
          })
          
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
  var selectItem = null;
  //选择对应的商品，判断是否已经选择过
    _.each(self.SelDataList,function(obj){
      if(obj.mtcode == item.mtcode){
        findflag = true;
        selectItem = obj
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
    else{
      item.selnum ++ 
      selectItem.selnum = item.selnum
    }
    console.log(self.SelDataList)
    //保存到缓存中
    this.CoolLocalStorage.setObject(WebConfig.cartkeyName,self.SelDataList)
    this._state.notifyDataChanged('CartOrderChanged',{refresh:true})
}

ItemSubClick(item){
  var self =this
  if(item.selnum <= 0){
    return
  }else{
    var delitem = null
     item.selnum --
     _.each(self.SelDataList,function(obj){
      if(obj.mtcode == item.mtcode){
        obj.selnum = item.selnum
      }
      if(item.selnum == 0){
        delitem = item
      }
    })
    if(delitem){
     var index = _.indexOf(self.SelDataList,delitem)
     self.SelDataList.splice(index,1)
    }
    console.log( self.SelDataList)
  }
  this.CoolLocalStorage.setObject(WebConfig.cartkeyName,this.SelDataList)
  this._state.notifyDataChanged('CartOrderChanged',{refresh:true})
}

CartOrder(){
  if(this.SelDataList.length == 0){
    return
  }
  this.navCtrl.push(CartorderPage,{DataList:this.SelDataList})
}
SearchItems(e){
  this.loadData(null)
}

//rxjs
InitControlEvent() {
  // var self = this
  // let searchTextControl = document.getElementById('searchText');
  // let input$ = Rx.Observable.fromEvent(searchTextControl, 'keyup');
  // input$.debounceTime(600).subscribe(function (e) {
  //   self.SearchItems("1")
  //   //self.LoadData('reload')
  // });
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
  let endTop = window.innerHeight - 30, endLeft =ClientWidth/2 - 55,left = startOffset.left+10,top = startOffset.top+10;
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


