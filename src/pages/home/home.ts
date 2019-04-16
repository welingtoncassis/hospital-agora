import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from '../../providers/alert/alert';
import { MapsProvider } from '../../providers/maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;

  map: any;

  location: {
    latitude: number,
    longitude: number
  };

  @ViewChild('map') mapElement: ElementRef;
  
  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation,
              public mapsProvider: MapsProvider, 
              public alert: AlertProvider,
              public loadingController: LoadingController) {
    
  }

  ionViewDidEnter() {
    this.findUserLocation();
  }

  findUserLocation(){
    let options = {
      maximumAge: 0,
      enableHighAccuracy: true,
      timeout: 10000
    };

    this.loading = this.loadingController.create({content:"Localizando, por favor aguarde... "});
    this.loading.present();


    this.geolocation.getCurrentPosition(options).then((position) => {

      this.loading.dismissAll();

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      this.mapsProvider.init(this.location, this.mapElement);
 

     }).catch((error) => {
      this.retryFindUserLocation();
     });
  }

  retryFindUserLocation(){
   let options = {
     maximumAge: 600000,
     enableHighAccuracy: false,
     timeout: 20000
   };


   this.geolocation.getCurrentPosition(options).then((position) => {

     this.location = {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     };

     this.mapsProvider.init(this.location, this.mapElement);

    }).catch((error) => {
      this.loading.dismissAll();
      console.log('Erro ao obter a localização', error.message);
      this.alert.alert('Erro ao obter a localização',error.message);
    });
 }

}
