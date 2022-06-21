import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string | undefined, nbCharactersToKeep = 3): unknown {
    if (value?.length! > nbCharactersToKeep) {
      return `${value?.substring(0, nbCharactersToKeep)}...`;
    }

    return value;
  }
}
