import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'prostatepipe'
})
@Injectable()
export class ProStatepipe {
  transform(value) {
    var ret = ''
    switch(value){
      case 1:ret = '购物车';break;
      case 2:ret = '待审核订单';break;
      case 3:ret = '待支付订单';break;
      case 4:ret = '财务已确认';break;
      case 5:ret = '仓库发货';break;
      case 6:ret = '部分收货';break;
      case 7:ret = '全部收货';break;
      case 8:ret = '付款了';break;
    }
    return ret;
  }
}
