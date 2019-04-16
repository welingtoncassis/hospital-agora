import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from '../../providers/maps/maps';
import { AlertProvider } from '../../providers/alert/alert';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  map: any;
  detalhes : Array<any> ;
  

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              public mapsProvider: MapsProvider,
              public alert: AlertProvider,
              private launchNavigator: LaunchNavigator
              ) {

  }

  ionViewDidLoad() {

    this.mapsProvider.getPlaceslist();
    this.detalhes = this.mapsProvider.detalhes;
  
  }

  goHospital(endereco: string){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.UBER
    };
    
    this.launchNavigator.navigate(endereco, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  callHospital(tel){

    if(tel == "Telefone não cadastrado"){
      this.alert.alert('Não é possivel fazer a ligição','Este Hospital não cadastrou um número de contato');
    }else{
      setTimeout(() => {
        window.open(`tel:${tel}`, '_system');
      },100);
    }
    
   }

}
