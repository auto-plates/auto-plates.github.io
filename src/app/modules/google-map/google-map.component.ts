import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { IPlateItem } from 'src/app/interfaces/plate-item.interface';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @Input() plateItem: IPlateItem;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    zoom: 8,
  };
  markers: any[] = [];

  private geocoder = new google.maps.Geocoder();

  constructor( private cdr: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const resultAddressArr = [];
    if (this.plateItem.area?.capital) {
      if (this.plateItem.area.capital.title.includes('Miasto')) {
        resultAddressArr.push(this.plateItem.area.title)
      } else {
        resultAddressArr.push(this.plateItem.area.capital.title)
      }
    }

    if (this.plateItem.area && !this.plateItem.area.capital.title.includes('Miasto')) {
      resultAddressArr.push(`${this.plateItem.area.title} powiat`)
    }

    resultAddressArr.push(`${this.plateItem.region.title} województwo`);

    this.geocoder.geocode({'address': `${resultAddressArr.join(', ')}`}, (results, status) => {
      if (status === 'OK') {
        this.center = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        this.initMarkers();
      }
    });
  }

  initMarkers(): void {
    if (!this.plateItem.area?.capital?.districts) {
      this.markers.push({
        position: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
        options: {
          animation: google.maps.Animation.DROP,
        },
      });
      this.cdr.detectChanges();
    } else {
      this.plateItem.area?.capital?.districts.forEach(district => {
        const resultAddres = [
          district.title,
          this.plateItem.area.title,
          this.plateItem.region.title
        ];
        this.geocoder.geocode({'address': `${resultAddres.join(', ')}`}, (results, status) => {
          if (status === 'OK') {
            this.markers.push({
              position: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              },
              options: {
                animation: google.maps.Animation.DROP,
              },
            });
            this.cdr.detectChanges();
          }
        });
      });
    }
  }
}
