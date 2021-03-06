

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseService} from './baseServices'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class orderServices  {
    constructor(public http:Http,public baseService:baseService) { 
    }

    //SureOrder
    public SureOrder(data):any{
        return this.baseService.postData("RecClientindentMains/CreateOrder",data)
    }
    public OrderList(data):any{
        return this.baseService.getData("RecClientindentMains",data)
    }
    public OrderListN(data):any{
        return this.baseService.postData("RecClientindentMains/orderlist",data)
    }
    public OrderCount(data):any{
        return this.baseService.getData("RecClientindentMains/count",data)
    }

    public OrderDetail(data):any{
        return this.baseService.getData("RecClientindents",data)
    }

    public OrderTotalCountMoney(data):any{
        return this.baseService.postData("RecClientindentMains/OrderTotalCountMoney",data)
    }

    //物料内容
    public RecMaterials(data):any{
        return this.baseService.getData("RecMaterials",data)
    }

    //更新状态
    public UpdateOrder(data,postData):any{
        return this.baseService.postgetData("RecClientindentMains/update",postData,data)
    }

    //部分收货
    public OrderPartPro(data):any{
        return this.baseService.postData("RecClientindentMains/PartPro",data)
    }
    //全部收货
    public OrderAllPro(data):any{
        return this.baseService.postData("RecClientindentMains/AllPro",data)
    }
    
}