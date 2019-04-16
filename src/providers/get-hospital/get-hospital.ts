import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class GetHospitalProvider {

  map: any;
  detalhes: Array<any> = [];

  constructor(public geolocation : Geolocation) { }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
 
    let opts = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    this.map = new google.maps.Map(element.nativeElement, opts);

    this.getFarmas(latLng).then( (results : Array<any>)=>{    
      
      for(let i = 0 ;i < results.length ; i++)
      {
        //loop para pegar valor bool e verificar se está aberta ou não e usar no marcador
        for(let i = 0 ;i < results.length ; i++){
          if(results[i].opening_hours == null){
            results[i].aberto = 'Não há informações sobre o horário de funcionamento';
          }else if(!results[i].opening_hours.open_now){
            results[i].aberto = 'Fechado neste momento';
          }else{
            results[i].aberto = 'Aberto neste momento';
          }
        }
        
        var service = new google.maps.places.PlacesService(this.map);
        var request = {
          placeId: results[i].place_id,
          fields: ['name','formatted_phone_number','formatted_address','opening_hours','geometry']
        };
        
        service.getDetails(request,(place , status)=>{
              if (status === google.maps.places.PlacesServiceStatus.OK) {
              if(place.formatted_phone_number == null){
                  place.formatted_phone_number = 'Telefone não cadastrado';
                }
                if(place.opening_hours == null){
                  place.aberto = 'Não há informações sobre o horário de funcionamento';
                }else if(!place.opening_hours.open_now){
                  place.aberto = 'Fechado neste momento';
                }else{
                  place.aberto = 'Aberto neste momento';
                }  
                this.detalhes[i] = place;

                this.createMarker(this.detalhes[i]);

              }
            } 
          );
      }
    },(status)=>console.log(status));
    
    this.addMarker(this.map);
    
  }

  getFarmas(latLng){
    var service = new google.maps.places.PlacesService(this.map);

    let request = {
        location : latLng,
        radius : 6000,
        types: ['hospital'],
        rankBy: google.maps.places.RankBy.prominence
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
              if(status === google.maps.places.PlacesServiceStatus.OK)
              {                 
                  resolve(results);
                  console.log(results);
              }else
              {
                  reject(status);
              }

        });
    });
  }

  
  createMarker(place){
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    icon: 'assets/icon/icon-29.png',
    position: place.geometry.location
    });
             
    let infoWindow = new google.maps.InfoWindow({});
    
      google.maps.event.addListener(marker, 'click', function() {
        
        infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        '<a href="tel:'+place.formatted_phone_number+' "><strong>Clique para Ligar:</strong> ' + place.formatted_phone_number +'<br></a>'+
          'Endereço: ' + place.formatted_address +'<br><strong>' + place.aberto + '</strong></div>');
        infoWindow.open(this.map, this);
      });
  }


  addMarker(map:any){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.BOUNCE,
      position: map.getCenter()
    });

    //adicionado 18/01
    let content = "<p>Estou aqui !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });
    //-----


  }

}
