import { Directive, ElementRef, Input,HostListener } from '@angular/core';
import { NavController, NavParams ,App} from 'ionic-angular';
import { TabsPage } from '../pages';
import {_} from 'underscore'

@Directive({ selector: '[goMain]' })
export class goMainDirective {
    data:any=[];

    constructor(el: ElementRef,public navctrl:NavController,public appctrl:App) {
       //el.nativeElement.style.backgroundColor = 'yellow';
    }
    
    @HostListener('click') onClick() {
        this.appctrl.getRootNav().setRoot(TabsPage);
    }
}