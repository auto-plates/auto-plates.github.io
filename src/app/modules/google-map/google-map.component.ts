import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { GoogleMapStyleHelper } from 'src/app/helpers/google-map-style.helper';
import { IPlateItem } from 'src/app/interfaces/plate-item.interface';
import { AreasService } from 'src/app/services/area.service';
import { RandomPlateService } from 'src/app/services/random-plate.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @Input() plateItemsList: IPlateItem[];

  zoom = 9;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    minZoom: 6,
    maxZoom: 12,
    styles: this.mapStyleHelper.mapStyle,
  };
  markers: MapMarker[] = [];

  private defaultRegionCode = 'W';
  private labelClassName = 'map__marker_label';
  private geocoder = new google.maps.Geocoder();
  private iconsSrc = '/assets/images/plate-marker.png';

  constructor(
    private cdr: ChangeDetectorRef,
    private areasService: AreasService,
    private randomPlateService: RandomPlateService,
    private mapStyleHelper: GoogleMapStyleHelper
  ) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    let resultAddressArr = [];
    const defaultPlate = this.plateItemsList.find(
      (item) => item.region.code === this.defaultRegionCode
    );
    if (Boolean(defaultPlate) && this.plateItemsList.length > 1) {
      resultAddressArr = [
        defaultPlate.region.capital,
        `${defaultPlate.region.title} województwo`,
      ];
    } else {
      let plateItem: IPlateItem;
      if (this.plateItemsList.length === 1) {
        plateItem = this.plateItemsList[0];
        if (plateItem.area?.capital) {
          if (plateItem.area.capital.title.includes('Miasto')) {
            resultAddressArr.push(plateItem.area.title);
          } else {
            resultAddressArr.push(plateItem.area.capital.title);
          }
        }

        if (
          plateItem.area &&
          !plateItem.area.capital.title.includes('Miasto')
        ) {
          resultAddressArr.push(`${plateItem.area.title} powiat`);
        }

        resultAddressArr.push(`${plateItem.region.title} województwo`);
      } else {
        resultAddressArr = [
          this.plateItemsList[0].region.capital,
          `${this.plateItemsList[0].region.title} województwo`,
        ];
      }
    }

    this.geocoder.geocode(
      { address: `${resultAddressArr.join(', ')}` },
      (results, status) => {
        if (status === 'OK') {
          this.center = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          this.initMarkers();
        }
      }
    );
  }

  private initMarkers(): void {
    this.plateItemsList.forEach((plateItem) => {
      if (!plateItem.area?.capital?.districts && !plateItem.promoPlates) {
        const resultAddressArr = [`${plateItem.region.title} województwo`];
        if (this.areasService.isCityArea(plateItem)) {
          resultAddressArr.unshift(plateItem.area.title);
        } else {
          resultAddressArr.unshift(`${plateItem.area?.title} powiat`);
          resultAddressArr.unshift(plateItem.area?.capital?.title);
        }
        this.geocoder.geocode(
          { address: `${resultAddressArr.join(', ')}` },
          (results, status) => {
            if (status === 'OK') {
              (this.markers as any[]).push({
                position: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
                icon: this.iconsSrc,
                label: {
                  className: this.labelClassName,
                  text: plateItem.code,
                },
              });
              this.cdr.detectChanges();
            }
          }
        );
      } else {
        plateItem.area?.capital?.districts.forEach((district) => {
          const resultAddress = [
            district.title,
            plateItem.area.title,
            `${plateItem.region.title} województwo`,
          ];
          this.geocoder.geocode(
            { address: `${resultAddress.join(', ')}` },
            (results, status) => {
              if (status === 'OK') {
                let resultMarkerEnding: string = '';
                if (district.lastLetters?.length) {
                  resultMarkerEnding = `-${
                    district.lastLetters[
                      this.randomPlateService.randomNumber(
                        0,
                        district.lastLetters.length - 1
                      )
                    ]
                  }`;
                }
                if (district.prelastLetter) {
                  resultMarkerEnding = `-${district.prelastLetter}#`;
                }
                (this.markers as any[]).push({
                  position: {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                  },
                  icon: this.iconsSrc,
                  label: {
                    text: `${plateItem.code}${resultMarkerEnding}`,
                    className: this.labelClassName,
                  },
                });
                this.cdr.detectChanges();
              }
            }
          );
        });
      }
    });
  }
}
