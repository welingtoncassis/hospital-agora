import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TermosPoliticaPage } from '../termos-politica/termos-politica';
import { AdMob } from "ionic-admob";



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  paginapolitica: any;

  constructor(public navCtrl: NavController,
              private admob: AdMob,
              public platform: Platform) {
  
    this.paginapolitica = TermosPoliticaPage;
    platform.ready().then(() => {
      admob.banner.show({
        id: {
          // replace with your ad unit IDs
          android: 'ca-app-pub-8955049849078343/3769395175',
          ios: 'ca-app-pub-8955049849078343/3769395175'
        },
      });
  });

  }




}
