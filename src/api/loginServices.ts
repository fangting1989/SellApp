

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseService} from './baseServices'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class loginServices  {
    constructor(public http:Http,public baseService:baseService) { 
    }

    //用户登入
    public UserLogin(data):any{
        return this.baseService.getData("DocClients",data)
    }
}