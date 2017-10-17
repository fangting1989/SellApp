import { Injectable } from '@angular/core';
import { ToastController, LoadingController ,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { WebConfig } from './../config/config'
import { _ } from 'underscore'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

@Injectable()
export class comServices {
    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController
        ) {
    }

    public toastInfo(msg:string){
        let toast = this.toastCtrl.create({
        message: msg,
            duration: 1500,
            position:'middle',
            cssClass:'toast-class'
        });
        toast.present();
    }

    public TipInfo(msg:string){
         let loading = this.loadingCtrl.create({
            content: msg,
            spinner: 'hide'
        });
        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 1500);
    }

    public ConfirmInfo(opt:any){
        let confirm = this.alertCtrl.create({
        title: opt.title == null?'提示':opt.title,
        message: opt.message == null?'提示':opt.message,
        buttons: [
            {
            text: '是',
            handler: () => {
                if(typeof opt.SureCallBack == 'function'){
                    opt.SureCallBack ()
                }
            }
            },
            {
            text: '否',
            handler: () => {
                if(typeof opt.CancelCallBack == 'function'){
                    opt.CancelCallBack ()
                }
            }
            }
        ]
        });
        confirm.present();

    }
}