

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseService} from './baseServices'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class homeServices  {
    constructor(public http:Http,public baseService:baseService) { 
    }

    //热门房源
    public selectHotHouse(data):any{
        return this.baseService.getData("houseHotController/selectHotHouse",data)
    }
    //热门中介
    public selectExcellentAgency():any{
        return this.baseService.getData("agencyController/selectExcellentAgency",{})
    }

    //获取openId
    public getOpenId(data):any{
        return this.baseService.getData("loginController/loginAction",data)        
    }

    //获取微信信息
    public TWechats(data):any{
        return this.baseService.TMData("TWechats",data)
    }
}