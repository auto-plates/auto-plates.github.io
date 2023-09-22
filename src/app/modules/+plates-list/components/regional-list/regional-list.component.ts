import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildService } from 'src/app/services/build.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateItem } from 'src/app/interfaces/plate-item.interface';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { IPlateSymbol } from 'src/app/interfaces/plate-symbol.interface';
import { AreasService } from 'src/app/services/area.service';

@Component({
  selector: 'app-regional-list',
  templateUrl: './regional-list.component.html',
  styleUrls: ['./regional-list.component.scss']
})
export class RegionalListComponent implements OnInit, OnDestroy {

  @Input() regionCode: string;
  @Input() currentCode = '';
  plateItemsList: IPlateItem[];
  displayedColumns: string[] = ['code', 'region', 'area', 'district', 'plate'];
  examplePlates: {[key: string]: {code: string, randomPlate: IPlateSymbol[]}} = {};
  
  get isDistrcitColumnVisible(): boolean {
    return Boolean(this.plateItemsList?.findIndex(item => item.area?.capital?.districts?.length) >= 0);
  };
  
  private isNodeJsBuild: boolean;
  private nodeJsSubscription: Subscription;

  constructor(
    public areasService: AreasService,
    private buildService: BuildService,
    private searchPlateService: SearchPlateService,
    private pb: ProgressBarService,
    private randomPlateService: RandomPlateService,
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
    setTimeout(() => {
      this.pb.startProgress();
      if (!this.isNodeJsBuild) {
        this.searchPlateService.searchPlateInfosByRegionCodeMocked(this.regionCode)
          .subscribe(this.handleRegionList);
      }
    }, 100);
  }

  private handleRegionList = (plateItemsList: IPlateItem[]): void => {
    setTimeout(() => {
      this.plateItemsList = plateItemsList.sort((lhs, rhs) => lhs.code < rhs.code ? -1 : 1);
      this.plateItemsList.forEach(item => {
        this.examplePlates[item.code] = {
          code: item.code,
          randomPlate: this.generatePlate(item)
        }
      });
      this.pb.stopProgress();
    }, this.pb.localProgressTime);
  }

  private generatePlate(plateItem: IPlateItem): IPlateSymbol[] {
    const districts = plateItem.area?.capital?.districts;
    let resultArray: IPlateSymbol[] = [];
    let prelastLetter,
        lastLetter;

    if (districts?.length) {
      prelastLetter = this.randomPlateService.getPrelastLetterForDistrict(districts);
      lastLetter = this.randomPlateService.getLastLetterForDistrict(districts)
    }

    if (!plateItem.promoPlates?.length) {
      resultArray = this.randomPlateService.generateRadomPlate(prelastLetter, lastLetter);
    } else {
      Array.from(plateItem.promoPlates[this.randomPlateService.randomNumber(0, plateItem.promoPlates.length - 1)]).map(symbol => {
        resultArray.push({
          symbol: symbol,
          isKeySymbol: false,
          tooltip: null
        });
      });
    }

    return resultArray;
  }
}
