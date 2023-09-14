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

  private isLoadingSubscription: Subscription;

  constructor(
    private searchPlateService: SearchPlateService,
    private randomPlateService: RandomPlateService,
    private plateFormService: PlateFormService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoadingSubscription = this.searchPlateService.isLoading$.subscribe(this.handleIsLoading);
    this.plateForm.plate.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.handlePlateValueChanged);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
  }

  private createForm(): void {
    this.plateForm = PlateForm.createForm();
  }

  private handlePlateValueChanged = (value: string): void => {
    this.plateValue = value;
    if (value.length > 1) {
      this.randomPlate = this.randomPlateService.generateRadomPlate(4, 1, 2);
    } else {
      this.randomPlate = null;
    }
    this.plateFormService.plateFormValue$.next(value);
  }

  private handleIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  }
}
