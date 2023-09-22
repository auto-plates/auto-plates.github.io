import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlateForm } from '../../forms/plate.form';
import { Subscription, debounceTime } from 'rxjs';
import { RandomPlateService } from 'src/app/services/random-plate.service';
import { SearchPlateService } from 'src/app/services/search-plate.service';
import { IPlateItem } from 'src/app/interfaces/plate-item.interface';
import { InputComponent } from 'src/app/modules/forms/components/input/input.component';
import { IPlateSymbol } from 'src/app/interfaces/plate-symbol.interface';

@Component({
  selector: 'app-plate-form',
  templateUrl: './plate-form.component.html',
  styleUrls: ['./plate-form.component.scss'],
  providers: [ RandomPlateService ]
})
export class PlateFormComponent implements OnInit, OnDestroy {
  @ViewChild(InputComponent) input: InputComponent;

  @Input() form: PlateForm;
  plateItem: IPlateItem;
  randomPlate: IPlateSymbol[];
  dynamicMaxLength = 3;
  isLoading: boolean;
  randomSearchQuery: string;
  isPromo: boolean;
  prelastLetter: string;
  lastLetter: string;

  private plateItemSubscription: Subscription;
  private randomPlateInfoSubscription: Subscription;

  constructor(
    private searchPlateService: SearchPlateService,
    private randomPlateService: RandomPlateService,
  ) {}

  ngOnInit(): void {
    this.plateItemSubscription = this.searchPlateService.plateItem$.subscribe(this.handlePlateInfo);
    this.loadRandomPlateInfo();
    this.form.plateCode.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.handlePlateValueChanged);
  }

  ngOnDestroy(): void {
    this.plateItemSubscription?.unsubscribe();
  }

  searchByExampleQuery(): void {
    this.resetKeyValues();
    this.form.plateCode.setValue(this.randomSearchQuery);
    this.loadRandomPlateInfo();
  }

  focusPlateControl(): void {
    this.input.focusControl();
  }

  private handlePlateValueChanged = (value: string): void => {
    if (!value.length) {
      this.resetKeyValues();
    }
  }

  private resetKeyValues(): void {
    this.isPromo = null;
    this.plateItem =  null;
    this.randomPlate = null;
    this.prelastLetter = null;
    this.lastLetter = null;
  }

  private handlePlateInfo = (plateItem: IPlateItem): void => {
    if (plateItem) {
      this.plateItem = plateItem;
      if (!plateItem?.promoPlates?.length) {
        if (this.form.plateCode?.value?.length > 1) {
          const districts = this.plateItem.area?.capital?.districts;
          if (districts?.length) {
            this.prelastLetter = this.randomPlateService.getPrelastLetterForDistrict(districts);
            this.lastLetter = this.randomPlateService.getLastLetterForDistrict(districts)
          }
          this.randomPlate = this.randomPlateService.generateRadomPlate(this.prelastLetter, this.lastLetter);
        } else {
          this.resetKeyValues();
        }
      } else {
        const promoPlates = this.plateItem.promoPlates;
        const resultPromoPlate = promoPlates[this.randomPlateService.randomNumber(0, promoPlates.length - 1)];
        this.randomPlate = Array.from(resultPromoPlate).reduce((acc: IPlateSymbol[], curr: string) => {
          acc.push({
            symbol: curr,
            isKeySymbol: false,
            tooltip: null
          });
          return acc;
        }, []);
      };
      this.isPromo = Boolean(this.plateItem?.promoPlates?.length);
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
