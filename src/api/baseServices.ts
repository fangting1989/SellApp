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
            mparams.append(key, prop)
        })
        let mheaders = new Headers();
        mheaders.append("Token", typeof localStorage.getItem('WebAdmin_token_admin_yunland') == "undefined" ? "" : localStorage.getItem('WebAdmin_token_admin_yunland'))
        return this.http.get(url, { search: mparams, headers: mheaders }).map((res: Response) => {
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

    //微信专用
    public TMData(methodurl, data): any {
        let url = WebConfig.TMUrl + methodurl;
        let mparams = new URLSearchParams();
        _.map(data, function (prop, key) {
            mparams.append(key, prop)
        })
        let mheaders = new Headers();
        mheaders.append("Token", typeof localStorage.getItem('WebAdmin_token_admin_yunland') == "undefined" ? "" : localStorage.getItem('WebAdmin_token_admin_yunland'))
        return this.http.get(url, { search: mparams, headers: mheaders }).map((res: Response) => {
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
            ; return Observable.throw(error || 'Server Cannot Access')
        })
    }


    //填写不完善无法跳转页面
    //发布房源(第一页)
    public skipPage(dataArr) {
        if (dataArr == {}) {
            return false;
        } else {
            for (var i in dataArr) {
                if (dataArr[i] == undefined || dataArr[i] == "" || dataArr[i] == "请输入正确的格式") {
                    if (i == "districtId") {
                        this.alertFunction("请选择区域");
                        return false;
                    } else if (i == "plotId") {
                        this.alertFunction("请选择小区名称");
                        return false
                    } else if (i == "houseUse") {
                        this.alertFunction("请选择房源类型");
                        return false;

                    } else if (i == "houseS") {
                        if(dataArr[i]==""){
                            continue;
                        }
                        this.alertFunction("请选择户型信息");
                        return false;
                    } else if (i == "houseT") {
                        if(dataArr[i]==""){
                            continue;
                        }
                        this.alertFunction("请选择户型信息");
                        return false;

                    } else if (i == "houseW") {
                        if(dataArr[i]==""){
                            continue;
                        }
                        this.alertFunction("请选择户型信息");
                        return false;

                    } else if (i == "houseFloor") {
                        this.alertFunction("请填写房源所在的楼层");
                        return false;

                    } else if (i == "floorTotal") {
                        this.alertFunction("请填写楼层总层数");
                        return false;

                    } else if (i == "floorSpace") {
                        this.alertFunction("请填写面积");
                        return false;

                    } else if (i == "housePrice") {
                        this.alertFunction("请填写出售总价");
                        return false;

                    } else if (i == "direction") {
                        this.alertFunction("请填写朝向");
                        return false;

                    } else if (i == "sellYear") {
                        this.alertFunction("请填写建筑年代");
                        return false;

                    } else if (i == "name") {
                        this.alertFunction("请填写标题");
                        return false;

                    } else if (i == "structureType") {
                        this.alertFunction("请选择房屋结构");
                        return false;

                    }
                    else if (i == "propertyType") {
                        this.alertFunction("请选择产权");
                        return false;

                    } else if (i == "decorateType") {
                        this.alertFunction("请选择装修");
                        return false;

                    } else if (i == "contactName") {
                        this.alertFunction("请填写联系人");
                        return false;

                    } else if (i == "contactPhone") {
                        this.alertFunction("请填写手机号");
                        return false;

                    }

                };
            }
        }
        return true;
    }
    //发布求购
    public skipPageBuy(dataArr) {
        if (dataArr == {}) {
            return false;
        } else {
            if (dataArr.districtId == "") {
                this.alertFunction("请选择区域");
                return false;
            }
            if (dataArr.houseUse == null) {
                this.alertFunction("请选择房源类型");
                return false;
            }
            if (dataArr.houseS == null) {
                this.alertFunction("请选择户型信息");
                return false;
            }
            if (dataArr.houseT == null) {
                this.alertFunction("请选择户型信息");
                return false;
            }
            if (dataArr.houseW == null) {
                this.alertFunction("请选择户型信息");
                return false;
            }
            if (dataArr.address == null || dataArr.address=="") {
                this.alertFunction("请填写求购地段");
                return false;
            }
            if (dataArr.houseFloor1 == null || dataArr.houseFloor1 =="") {
                this.alertFunction("请选择求购起始楼层");
                return false;
            }
            if (dataArr.houseFloor2 == null || dataArr.houseFloor2 =="") {
                this.alertFunction("请选择求购最高层");
                return false;
            }
            if (dataArr.housePrice2 == null || dataArr.housePrice2 =="") {
                this.alertFunction("请选择求购价");
                return false;
            }
            // if (dataArr.floorSpace1 == null) {
            //     this.alertFunction("请填写求购面积");
            //     return false;
            // }
            // if (dataArr.floorSpace2 == null) {
            //     this.alertFunction("请填写求购面积");
            //     return false;
            // }
            // if (dataArr.sellYear1 == null) {
            //     this.alertFunction("请选择年代");
            //     return false;
            // }
            // if (dataArr.direction == null) {
            //     this.alertFunction("请填写朝向");
            //     return false;
            // }
            // if (dataArr.contactName == null) {
            //     this.alertFunction("请填写联系人姓名");
            //     return false;
            // }
            // if (dataArr.contactTelPhone == null) {
            //     this.alertFunction("请填写联系方式");
            //     return false;
            // }
        }
    }
    public skipPageTwoBuy(dataArr) {
        if (dataArr == {}) {
            return false;
        } else {
            if (dataArr.floorSpace1 == '') {
                this.alertFunction("请填写求购面积");
                return false;
            }
            if (dataArr.floorSpace2 == '') {
                this.alertFunction("请填写求购面积");
                return false;
            }
            if (dataArr.direction == null) {
                this.alertFunction("请填写朝向");
                return false;
            }
            if (dataArr.sellYear1 == null) {
                this.alertFunction("请选择年代");
                return false;
            }
            if (dataArr.contactName == null || dataArr.contactName == "请填写正确的格式") {
                this.alertFunction("请填写联系人姓名");
                return false;
            }
            if (dataArr.contactTelPhone == null || dataArr.contactTelPhone == "请填写正确的格式") {
                console.log(dataArr.contactTelPhone == null || dataArr.contactTelPhone == "请填写正确的格式"||dataArr.contactTelPhone == "");
                this.alertFunction("请填写联系方式");
                return false;
            }
        }
    }

    //获取焦点清空内容
    public clearContent(value) {
        return value = "";
    }

    //封装loading(做提示的弹出框);   
    public alertFunction(value) {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: value,
            duration: 900
        });
        loading.present();
        return false;
    }

    public setDetail(dataArr) {
        // console.log(dataArr)
        if (dataArr == {}) {
            return false
        } else {
            for (var i in dataArr) {
                if (dataArr[i] == undefined || dataArr[i] == "") {
                    if (i == "mobilePhone") {
                        this.alertFunction("请填写手机号");
                        return false;
                    } else if (i == "name") {
                        this.alertFunction("请填写姓名");
                        return false;
                    } else if (i == "code") {
                        this.alertFunction("请填写验证码");
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
