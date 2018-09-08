import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: any, path: string[], order: number): any {

    if (!value || !path || !order)
      return value;

    return value.sort((a: any, b: any) => {
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })
      return a > b ? order : order * (-1);
    });
  }
}
