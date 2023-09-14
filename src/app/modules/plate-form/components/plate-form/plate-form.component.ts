import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlateForm } from '../../forms/plate.form';
import { Subscription, debounceTime } from 'rxjs';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { PlateFormService } from 'src/app/services/plate-form.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss'],
  providers: [ RandomPlateService ]
})
export class PlateFormComponent implements OnInit, OnDestroy {

  plateForm: PlateForm;
  plateInfo: IPlateInfo;
  randomPlate: string;
  dynamicMaxLength = 3;
  isLoading: boolean;
  exmampleSearchQuery: string;
  isPromo: boolean;

  private isLoadingSubscription: Subscription;
  private plateInfoSubscription: Subscription;

  constructor(
    private searchPlateService: SearchPlateService,
    private randomPlateService: RandomPlateService,
    private plateFormService: PlateFormService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoadingSubscription = this.searchPlateService.isLoading$.subscribe(this.handleIsLoading);
    this.plateInfoSubscription = this.searchPlateService.plateInfo$.subscribe(this.handlePlateIfo);
    this.exmampleSearchQuery = this.searchPlateService.getExampleSearchQuery();
    this.plateForm.plate.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.handlePlateValueChanged);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
    this.plateInfoSubscription?.unsubscribe();
  }

  searchByExampleQuery(): void {
    this.plateForm.plate.setValue(this.exmampleSearchQuery);
    this.exmampleSearchQuery = this.searchPlateService.getExampleSearchQuery();
  }

  private createForm(): void {
    this.plateForm = PlateForm.createForm();
  }

  private handlePlateValueChanged = (value: string): void => {
    this.plateFormService.plateFormValue$.next(value);
    if (!value.length) {
      this.isPromo = null;
      this.plateInfo =  null;
      this.randomPlate = null;
    }
  }

  private handleIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  }

  private handlePlateIfo = (plateInfo: IPlateInfo): void => {
    this.plateInfo = plateInfo;
    if (!plateInfo.promoPlates?.length) {
      const letters = this.randomPlateService.randomNumber(0, 3);
      const numbers = 5 - letters;
      if (this.plateForm.plate?.value?.length > 1) {
        this.randomPlate = this.randomPlateService.generateRadomPlate(numbers, letters, 1);
      } else {
        this.randomPlate = null;
      }
    } else {
      const promoPlates = this.plateInfo.promoPlates;
      this.randomPlate = promoPlates[this.randomPlateService.randomNumber(0, promoPlates.length)];
    };
    this.isPromo = Boolean(this.plateInfo.promoPlates?.length);
  }
}
