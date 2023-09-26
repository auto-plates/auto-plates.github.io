import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endings',
})
export class EndingsPipe implements PipeTransform {
  transform(value: number | string, titles: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    if (typeof value === 'string') {
      value = +value;
    }

    return titles[
      value % 100 > 4 && value % 100 < 20
        ? 2
        : cases[value % 10 < 5 ? value % 10 : 5]
    ];
  }
}
