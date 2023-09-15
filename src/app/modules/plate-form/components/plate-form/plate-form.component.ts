import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlateForm } from '../../forms/plate.form';
import { Subscription, debounceTime } from 'rxjs';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateInfo } from 'src/app/interfaces/plate-info.interface';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss'],
  providers: [ RandomPlateService ]
})
export class PlateFormComponent implements OnInit, OnDestroy {

  @Input() form: PlateForm;
  plateInfo: IPlateInfo;
  randomPlate: string;
  dynamicMaxLength = 3;
  isLoading: boolean;
  randomSearchQuery: string;
  isPromo: boolean;

  private plateInfoSubscription: Subscription;
  private randomPlateInfoSubscription: Subscription;

  constructor(
    private searchPlateService: SearchPlateService,
    private randomPlateService: RandomPlateService,
  ) {}

  ngOnInit(): void {
    this.plateInfoSubscription = this.searchPlateService.plateInfo$.subscribe(this.handlePlateInfo);
    this.loadRandomPlateInfo();
    this.form.plate.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.handlePlateValueChanged);
  }

  ngOnDestroy(): void {
    this.plateInfoSubscription?.unsubscribe();
  }

  searchByExampleQuery(): void {
    this.form.plate.setValue(this.randomSearchQuery);
    this.loadRandomPlateInfo();
  }

  private handlePlateValueChanged = (value: string): void => {
    if (!value.length) {
      this.isPromo = null;
      this.plateInfo =  null;
      this.randomPlate = null;
    }
  }

  private handlePlateInfo = (plateInfo: IPlateInfo): void => {
    if (plateInfo) {
      this.plateInfo = plateInfo;
      if (!plateInfo?.promoPlates?.length) {
        if (this.form.plate?.value?.length > 1) {
          this.randomPlate = this.randomPlateService.generateRadomPlate();
        } else {
          this.randomPlate = null;
        }
      } else {
        const promoPlates = this.plateInfo.promoPlates;
        this.randomPlate = promoPlates[this.randomPlateService.randomNumber(0, promoPlates.length)];
      };
      this.isPromo = Boolean(this.plateInfo?.promoPlates?.length);
    }
  }

  private loadRandomPlateInfo() {
    this.randomPlateInfoSubscription?.unsubscribe();
    setTimeout(() => {
      this.randomPlateInfoSubscription = this.searchPlateService.getRandomSearchQueryMocked().subscribe((randomPlateInfo => {
        this.randomSearchQuery = randomPlateInfo.code;
      }));
    })
  }
}
