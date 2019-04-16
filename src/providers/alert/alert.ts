import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(public alertCtrl: AlertController, 
              public toastCtrl: ToastController) {
    
  }

  toast(title: string, position: string): void{
    let toast = this.toastCtrl.create({ message: title, position: position, duration: 3000});
    toast.present();
  }

  alert(title: string, message: string): void{
    this.alertCtrl.create({
      title: title,
      message: message, 
      buttons: ['Ok'],
      enableBackdropDismiss: false // obrigatoriamente clicar no ok
    }).present();
  }

  confirm(title: string, message: string, funcao: any){
  
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Não', handler: () =>{
            console.log('Confirm: say: no');
          }
        },
        {
          text: "Sim", handler: () =>{
            funcao();
          }
        }
      ]
    })
    .present();
  }

}
