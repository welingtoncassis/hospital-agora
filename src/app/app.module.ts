import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TermosPoliticaPage } from '../pages/termos-politica/termos-politica';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from '../providers/alert/alert';
import { GetHospitalProvider } from '../providers/get-hospital/get-hospital';
import { MapsProvider } from '../providers/maps/maps';
import { AdMob } from "ionic-admob";
import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TermosPoliticaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TermosPoliticaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AdMob,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    GetHospitalProvider,
    MapsProvider
  ]
})
export class AppModule {}
