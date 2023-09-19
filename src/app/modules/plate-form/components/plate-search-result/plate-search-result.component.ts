import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { BuildService } from 'src/app/services/build.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { PlateForm } from '../../forms/plate.form';
import { RouteHelper } from 'src/app/helpers/route.helper';

@Component({
  selector: 'app-plate-search-result',
  templateUrl: './plate-search-result.component.html',
  styleUrls: ['./plate-search-result.component.scss']
})
export class PlateSearchResultComponent implements OnInit, OnDestroy {

  @Input() form: PlateForm;
  
  plateInfo: IPlateInfo | null;
  isNothingFound = false;
  isFormSubmitted: boolean;
  isRegionSelected = false;
  
  private isNodeJsBuild: boolean;
  private nodeJsSubscription: Subscription;

  constructor(
    public routeHelper: RouteHelper,
    private buildService: BuildService,
    private searchPlateService: SearchPlateService,
    private pb: ProgressBarService,
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    this.form.plate.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.searchPlate);
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
  }

  selectRegion(): void {
    if (this.isRegionSelected) {
      return;
    }
    this.isRegionSelected = true;
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  }

  private searchPlate = (value: string): void => {
    this.isRegionSelected = null;
    this.plateInfo = null;
    if (value) {
      this.pb.startProgress();
      this.isNothingFound = false;
      if (!this.isNodeJsBuild) {
        this.searchPlateService.searchPlateInfoMocked(value.trim()).subscribe(this.handlePlateInfo);
      } else {
        // TODO add here service for node JS
      }
    }
  }

  private handlePlateInfo = (plateInfo: IPlateInfo): void => {
    setTimeout(() => {
      this.plateInfo = plateInfo;
      this.searchPlateService.plateInfo$.next(plateInfo);
      this.isNothingFound = Boolean(this.form.plate?.value && !plateInfo);
      this.pb.stopProgress();
    }, this.pb.localProgressTime)
  } 
}
