import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { WebConfig } from './../config/config'
import { _ } from 'underscore'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

@Injectable()
export class comServices {
    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController
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
}