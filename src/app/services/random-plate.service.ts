import { Injectable } from '@angular/core';

@Injectable()
export class RandomPlateService {

  generateRadomPlate(numbers: number = 1, letters: number = 0, staticStartIndex: number = 0): string {
    const resultArr = [];
    const lettersChars = 'ABCDEFGHJKLMNPRSTUVWXY';
    const numbersChars = '0123456789';

    for (let i = 0; i < numbers; i++) {
      resultArr.push(numbersChars.charAt(Math.floor(Math.random() * numbersChars.length)));
    }
    
    for (let i = 0; i < letters; i++) {
      resultArr.push(lettersChars.charAt(Math.floor(Math.random() * lettersChars.length)));
    }

    return this.shuffleArray(resultArr, staticStartIndex).join('');
  }

  private shuffleArray = (arr: string[], staticStartIndex: number = 0): string[] => {
    const staticArr = staticStartIndex ? arr.slice(0, staticStartIndex) : [];
    const dynamicArr = staticStartIndex ? arr.slice(staticStartIndex) : arr;
    for (let i = 0; i < dynamicArr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = dynamicArr[i];
      dynamicArr[i] = dynamicArr[j];
      dynamicArr[j] = temp;
    }

    return [...staticArr, ...dynamicArr];
  }
}
