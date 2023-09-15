import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildService } from 'src/app/services/build.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { RandomPlateService } from 'src/app/services/random-plate.service';

@Component({
  selector: 'app-regional-list',
  templateUrl: './regional-list.component.html',
  styleUrls: ['./regional-list.component.scss']
})
export class RegionalListComponent implements OnInit, OnDestroy {

  @Input() plateInfo: IPlateInfo | null;
  isNodeJsBuild: boolean;
  plateInfoList: IPlateInfo[];
  displayedColumns: string[] = ['code', 'region', 'area', 'city', 'plate'];
  examplePlates: {[key: string]: string} = {}

  private nodeJsSubscription: Subscription;
  private regionListSubscription: Subscription;

  constructor(
    private buildService: BuildService,
    private searchPlateService: SearchPlateService,
    private pb: ProgressBarService,
    private randomPlateService: RandomPlateService
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    setTimeout(() => {
      this.pb.startProgress();
      this.searchPlateService.searchPlateInfosByRegionMocked(this.plateInfo.region)
        .subscribe(this.handleRegionList)
    }, 100);
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
    this.regionListSubscription?.unsubscribe();
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  }

  private handleRegionList = (plateInfoList: IPlateInfo[]): void => {
    setTimeout(() => {
      this.plateInfoList = plateInfoList;
      this.plateInfoList.forEach(item => {
        this.examplePlates[item.code] = this.generatePlate(item);
      });
      this.pb.stopProgress();
    }, this.pb.localProgressTime);
  }

  private generatePlate(plateInfo: IPlateInfo): string {
    if (!plateInfo.promoPlates?.length) {
      return `${plateInfo.code} ${this.randomPlateService.generateRadomPlate()}`;
    }
    return `${plateInfo.code} ${plateInfo.promoPlates[this.randomPlateService.randomNumber(0, plateInfo.promoPlates.length)]}`;
  }
}
