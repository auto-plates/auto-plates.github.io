import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildService } from 'src/app/services/build.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IRegionBase } from 'src/app/interfaces/region.interface';

@Component({
  selector: 'app-regional-list',
  templateUrl: './regional-list.component.html',
  styleUrls: ['./regional-list.component.scss']
})
export class RegionalListComponent implements OnInit, OnDestroy {

  @Input() region: IRegionBase;
  @Input() currentCode = '';
  isNodeJsBuild: boolean;
  plateInfoList: IPlateInfo[];
  displayedColumns: string[] = ['code', 'region', 'area', 'city', 'plate'];
  examplePlates: {[key: string]: SafeHtml} = {}

  private nodeJsSubscription: Subscription;
  private regionListSubscription: Subscription;

  constructor(
    private buildService: BuildService,
    private searchPlateService: SearchPlateService,
    private pb: ProgressBarService,
    private randomPlateService: RandomPlateService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    setTimeout(() => {
      this.pb.startProgress();
      this.searchPlateService.searchPlateInfosByRegionMocked(this.region.title)
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
      this.plateInfoList = plateInfoList.sort((lhs, rhs) => lhs.code < rhs.code ? -1 : 1);
      this.plateInfoList.forEach(item => {
        this.examplePlates[item.code] = this.sanitizer.bypassSecurityTrustHtml(this.generatePlate(item));
      });
      this.pb.stopProgress();
    }, this.pb.localProgressTime);
  }

  private generatePlate(plateInfo: IPlateInfo): string {
    const districts = plateInfo.city?.districts;
    let prelastLetter,
        lastLetter;

    if (districts?.length) {
      prelastLetter = this.randomPlateService.getPrelastLetterForDistrict(districts);
      lastLetter = this.randomPlateService.getLastLetterForDistrict(districts)
    }

    if (!plateInfo.promoPlates?.length) {
      return `
        <div class="code">${plateInfo.code}</div>
        <div class="number">${this.randomPlateService.generateRadomPlate(prelastLetter, lastLetter)}</div>
      `;
    }

    return `
      <div class="code">${plateInfo.code}</div>
      <div class="number">${plateInfo.promoPlates[this.randomPlateService.randomNumber(0, plateInfo.promoPlates.length - 1)]}<div>
    `;
  }
}
