

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
}