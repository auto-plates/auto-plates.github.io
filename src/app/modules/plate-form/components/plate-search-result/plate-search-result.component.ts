import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { BuildService } from 'src/app/services/build.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateItem } from 'src/app/interfaces/plate-item.interface';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { PlateForm } from '../../forms/plate.form';
import { RouteHelper } from 'src/app/helpers/route.helper';
import { AreasService } from 'src/app/services/area.service';

@Component({
  selector: 'app-plate-search-result',
  templateUrl: './plate-search-result.component.html',
  styleUrls: ['./plate-search-result.component.scss']
})
export class PlateSearchResultComponent implements OnInit, OnDestroy {

  @Input() form: PlateForm;
  
  plateItem: IPlateItem | null = null;
  isNothingFound = false;
  isFormSubmitted: boolean;
  isRegionSelected = false;
  
  private isNodeJsBuild: boolean;
  private nodeJsSubscription: Subscription;

  constructor(
    public routeHelper: RouteHelper,
    public areasService: AreasService,
    private buildService: BuildService,
    private searchPlateService: SearchPlateService,
    private pb: ProgressBarService,
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    this.form.plateCode.valueChanges
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
    this.plateItem = null;
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

  private handlePlateInfo = (plateItem: IPlateItem): void => {
    setTimeout(() => {
      this.plateItem = plateItem;
      this.searchPlateService.plateItem$.next(plateItem);
      this.isNothingFound = Boolean(this.form.plateCode?.value && !plateItem);
      this.pb.stopProgress();
    }, this.pb.localProgressTime)
  }
}
