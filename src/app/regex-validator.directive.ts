import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


@Directive({
  selector: '[appRegexValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexValidatorDirective, multi: true}]
})
export class RegexValidatorDirective implements Validator {
  @Input() text: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.text ? regexValidator(new RegExp(this.text, 'i'))(control)
                              : null;
  }
}

export function regexValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const text = nameRe.test(control.value);
    return text ? {'text': {value: !control.value}} : null;
  };
}