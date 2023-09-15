import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomPlateService {

  generateRadomPlate(): string {
    const resultArr = [];
    const lettersChars = 'ABCDEFGHJKLMNPRSTUVWXY';
    const numbersChars = '0123456789';
    const letters = this.randomNumber(0, 3);
    const numbers = 5 - letters;
    const staticStartIndex = 1;

    for (let i = 0; i < numbers; i++) {
      resultArr.push(numbersChars.charAt(this.randomNumber(0, numbersChars.length)));
    }
    
    for (let i = 0; i < letters; i++) {
      resultArr.push(lettersChars.charAt(this.randomNumber(0, lettersChars.length)));
    }

    return this.shuffleArray(resultArr, staticStartIndex).join('');
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private shuffleArray = (arr: string[], staticStartIndex: number = 0): string[] => {
    const staticArr = staticStartIndex ? arr.slice(0, staticStartIndex) : [];
    const dynamicArr = staticStartIndex ? arr.slice(staticStartIndex) : arr;
    for (let i = 0; i < dynamicArr.length; i++) {
      const j = this.randomNumber(0, (i + 1));
      const temp = dynamicArr[i];
      dynamicArr[i] = dynamicArr[j];
      dynamicArr[j] = temp;
    }

    return [...staticArr, ...dynamicArr];
  }
}
