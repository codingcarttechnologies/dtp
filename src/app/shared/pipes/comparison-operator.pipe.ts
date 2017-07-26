import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comparisonOperator'
})
export class ComparisonOperatorPipe implements PipeTransform {

  transform(value: string): string {
    let result: string;

    switch (value) {
      case 'GREATER_THAN':
        result = '>';
        break;

      case 'LESS_THAN':
        result = '<';
        break;

      default:
        result = '=';
        break;
    };

    return result;
  }

}
