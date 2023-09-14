import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlateForm } from '../../forms/plate.form';
import { Subscription, debounceTime } from 'rxjs';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { BuildService } from 'src/app/services/build.service';
import { PlateFormService } from 'src/app/services/plate-form.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';

@Component({
  selector: 'app-plate-search-result',
  templateUrl: './plate-search-result.component.html',
  styleUrls: ['./plate-search-result.component.scss']
})
export class PlateSearchResultComponent implements OnInit, OnDestroy {

  isNodeJsBuild: boolean;
  plateInfo: IPlateInfo | null;
  plateFormValue: string;
  isLoading: boolean;

  private nodeJsSubscription: Subscription;
  private plateFormSubscription: Subscription;
  private isLoadingSubscription: Subscription;

  constructor(
    private buildService: BuildService,
    private plateFormService: PlateFormService,
    private searchPlateService: SearchPlateService
  ) {}

  ngOnInit(): void {
    this.nodeJsSubscription = this.buildService.isNodeJsBuild$.subscribe(this.handleBuild);
    this.plateFormSubscription = this.plateFormService.plateFormValue$.subscribe(this.handlePlateFormValue);
    this.isLoadingSubscription = this.searchPlateService.isLoading$.subscribe(this.handleIsLoading);
  }

  ngOnDestroy(): void {
    this.nodeJsSubscription?.unsubscribe();
    this.plateFormSubscription?.unsubscribe();
    this.isLoadingSubscription?.unsubscribe();
  }

  private handleBuild = (isNodeJsBuild: boolean): void => {
    this.isNodeJsBuild = isNodeJsBuild;
  }

  private handlePlateFormValue = (plateFormValue: string): void => {
    this.plateFormValue = plateFormValue;
    if (!this.isNodeJsBuild) {
      this.plateInfo = this.searchPlateService.searchMockedPlateInfo(plateFormValue);
    }
  }

  private handleIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  }
}
