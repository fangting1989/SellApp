import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { WebConfig } from './../config/config'
import { _ } from 'underscore'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

@Injectable()
export class baseService {
    constructor(public http: Http,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController, ) {
    }
    public getData(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let mparams = new URLSearchParams();
        _.map(data, function (prop, key) {
            mparams.append(key, JSON.stringify(prop))
        })
        let mheaders = new Headers();
        mheaders.append("Token", typeof localStorage.getItem('WebAdmin_token_admin_yunland') == "undefined" ? "" : localStorage.getItem('WebAdmin_token_admin_yunland'))
        return this.http.get(url, { search: mparams, headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            // if (typeof retData.errid != 'undefined' && retData.errid < 0) {
            //     let loading = this.loadingCtrl.create({
            //         content: '请求错误,可能原因是:' + retData.errmsg,
            //         duration: 1500
            //     });
            //     loading.present();
            //     return null
            // }

            // localStorage.setItem('WebAdmin_token_admin_yunland', retData.token)
            return retData;
        }).catch((error: any) => {
            let loading = this.loadingCtrl.create({
                content: '请求网络错误',
                duration: 800
            });
            loading.present();
            ; return Observable.throw(error || 'Server Cannot Access')
        })
    }

    public postData(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let body = data// JSON.stringify(data);
        let mheaders = new Headers();
        //插入兼职
        mheaders.append("Token", typeof localStorage.getItem('WebAdmin_token_admin_yunland') == "undefined" ? "" : localStorage.getItem('WebAdmin_token_admin_yunland'))
        mheaders.append("Content-Type", "application/json")
        return this.http.post(url, body, { headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            // if (typeof retData.errid != 'undefined' && retData.errid < 0) {
            //     let loading = this.loadingCtrl.create({
            //         content: '请求错误,可能原因是:' + retData.errmsg,
            //         duration: 1500
            //     });
            //     loading.present();
            //     return null
            // }
            // localStorage.setItem('WebAdmin_token_admin_yunland', retData.token)
            return retData;
        }).catch((error: any) => {
            let loading = this.loadingCtrl.create({
                content: '请求网络错误',
                duration: 800
            });
            loading.present();
            return Observable.throw(error || 'Server Cannot Access')
        })
    }
    public postFile(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let body = data// JSON.stringify(data);
        let mheaders = new Headers();
        //插入兼职
        mheaders.append("Token", typeof localStorage.getItem('WebAdmin_token_admin_yunland') == "undefined" ? "" : localStorage.getItem('WebAdmin_token_admin_yunland'))
        mheaders.append("Content-Type", "application/json")
        return this.http.post(url, body, { headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                let loading = this.loadingCtrl.create({
                    content: '请求错误,可能原因是:' + retData.errmsg,
                    duration: 1500
                });
                loading.present();
                return null
            }
            localStorage.setItem('WebAdmin_token_admin_yunland', retData.token)
            return retData;
        }).catch((error: any) => {
            let loading = this.loadingCtrl.create({
                content: '请求网络错误',
                duration: 800
            });
            loading.present();
            return Observable.throw(error || 'Server Cannot Access')
        })
    }
}
