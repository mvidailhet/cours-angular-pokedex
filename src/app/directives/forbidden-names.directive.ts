import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appForbiddenNames]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenNamesDirective, multi: true }],
})
export class ForbiddenNamesDirective {
  @Input('appForbiddenName') forbiddenNames = ['Mitch', 'Robert'];

  validate(control: AbstractControl): ValidationErrors | null {
    const isForbiden = this.forbiddenNames.includes(control.value);

    return isForbiden ? { nameIsForbidden: true } : null;
  }
}
