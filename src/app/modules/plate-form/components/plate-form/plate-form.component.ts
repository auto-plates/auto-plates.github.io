import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlateForm } from '../../forms/plate.form';
import { Subscription, debounceTime } from 'rxjs';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { PlateFormService } from 'src/app/services/plate-form.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss'],
  providers: [ RandomPlateService ]
})
export class PlateFormComponent implements OnInit, OnDestroy {

  plateForm: PlateForm;
  plateValue = null;
  randomPlate: string;
  dynamicMaxLength = 3;
  isLoading: boolean;
  exmampleSearchQuery: string;

  private isLoadingSubscription: Subscription;

  constructor(
    private searchPlateService: SearchPlateService,
    private randomPlateService: RandomPlateService,
    private plateFormService: PlateFormService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoadingSubscription = this.searchPlateService.isLoading$.subscribe(this.handleIsLoading);
    this.exmampleSearchQuery = this.searchPlateService.getExampleSearchQuery();
    this.plateForm.plate.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.handlePlateValueChanged);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
  }

  searchByExampleQuery(): void {
    this.plateForm.plate.setValue(this.exmampleSearchQuery);
    this.exmampleSearchQuery = this.searchPlateService.getExampleSearchQuery();
  }

  private createForm(): void {
    this.plateForm = PlateForm.createForm();
  }

  private handlePlateValueChanged = (value: string): void => {
    this.plateValue = value;
    const letters = this.randomPlateService.randomNumber(0, 3);
    const numbers = 5 - letters;
    if (value.length > 1) {
      this.randomPlate = this.randomPlateService.generateRadomPlate(numbers, letters, 2);
    } else {
      this.randomPlate = null;
    }
    this.plateFormService.plateFormValue$.next(value);
  }

  private handleIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  }
}
