import { Injectable } from '@angular/core';
import { GetHospitalProvider } from '../get-hospital/get-hospital';


@Injectable()
export class MapsProvider {

  map: any;
  detalhes: Array<any>;
  
 
  constructor() {
    
      this.map = new GetHospitalProvider(this.map);
  }
 
  init(location, element){
    this.map.init(location, element);
    this.detalhes = this.map.detalhes;
    
  }

  getPlaceslist(){
    this.detalhes = this.map.detalhes;
  }

}

