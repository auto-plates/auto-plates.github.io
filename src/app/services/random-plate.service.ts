import { Injectable } from '@angular/core';
import { IDistrict } from '../interfaces/district.interface';
import { IPlateSymbol } from '../interfaces/plate-symbol.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomPlateService {
  keyLetterTitle = 'Ten symbol wskazuje lokalizację, w której wydano numer';

  generateRadomPlate(
    prelastLetter?: string,
    lastLetter?: string
  ): IPlateSymbol[] {
    const resultArr: IPlateSymbol[] = [];
    const lettersChars = 'ABCDEFGHJKLMNPRSTUVWXY';
    const numbersChars = '0123456789';
    const letters =
      prelastLetter || lastLetter
        ? this.randomNumber(0, 1)
        : this.randomNumber(0, 2);
    const maxNumberLength = 5;
    const numbers =
      prelastLetter || lastLetter
        ? maxNumberLength - letters - 1
        : maxNumberLength - letters;
    const staticStartIndex = 1;

    for (let i = 0; i < numbers; i++) {
      resultArr.push({
        isKeySymbol: false,
        symbol: numbersChars.charAt(
          this.randomNumber(0, numbersChars.length - 1)
        ),
        tooltip: null,
      });
    }

    for (let i = 0; i < letters; i++) {
      resultArr.push({
        isKeySymbol: false,
        symbol: lettersChars.charAt(
          this.randomNumber(0, lettersChars.length - 1)
        ),
        tooltip: null,
      });
    }

    return this.shufflePlateNumber(
      resultArr,
      staticStartIndex,
      prelastLetter,
      lastLetter
    );
  }

  getPrelastLetterForDistrict(districts: IDistrict[]): string | null {
    const prelastLettersArray = districts
      .filter((item) => item.prelastLetter)
      .reduce((acc, curr) => [...acc, [curr.prelastLetter]], []);

    return prelastLettersArray.length
      ? prelastLettersArray[this.randomNumber(0, prelastLettersArray.length)]
      : null;
  }

  getLastLetterForDistrict(districts: IDistrict[]): string | null {
    const lastLettersArray = districts
      .filter((item) => item.lastLetters?.length)
      .reduce((acc, curr) => [...acc, ...curr.lastLetters], []);
    return lastLettersArray.length
      ? lastLettersArray[this.randomNumber(0, lastLettersArray.length)]
      : null;
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  private shufflePlateNumber = (
    plateAsArr: IPlateSymbol[],
    staticStartIndex: number = 0,
    prelastLetter: string = null,
    lastLetter: string = null
  ): IPlateSymbol[] => {
    const staticArr = staticStartIndex
      ? plateAsArr.slice(0, staticStartIndex)
      : [];
    const dynamicArr = staticStartIndex
      ? plateAsArr.slice(staticStartIndex)
      : plateAsArr;
    for (let i = 0; i < dynamicArr.length; i++) {
      const j = this.randomNumber(0, i + 1);
      const temp = dynamicArr[i];
      dynamicArr[i] = dynamicArr[j];
      dynamicArr[j] = temp;
    }

    const resultArr = [...staticArr, ...dynamicArr];
    if (prelastLetter) {
      resultArr.splice(resultArr.length - 1, 0, {
        symbol: prelastLetter,
        isKeySymbol: true,
        tooltip: this.keyLetterTitle,
      });
    }
    if (lastLetter) {
      resultArr.push({
        symbol: lastLetter,
        isKeySymbol: true,
        tooltip: this.keyLetterTitle,
      });
    }

    return resultArr;
  };
}
