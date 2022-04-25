import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string | undefined): unknown {
    if (value?.length! > 3) {
      return `${value?.substring(0, 3)}...`;
    }

    return value;
  }
}
