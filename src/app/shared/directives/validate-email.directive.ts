import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

export function isEmailValid(email: string): boolean {
  if (!email || email.length === 0) {
    return false;
  }

  let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  return EMAIL_REGEXP.test(email);
}

@Directive({
  selector: '[validate-email][ngControl],[validate-email][ngModel],[validate-email][ngFormControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEmailDirective), multi: true }
  ]
})
export class ValidateEmailDirective implements Validator {

  validate(c: AbstractControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }

    return isEmailValid(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  };

  constructor( @Attribute('validate-email') public validateEmail: string) { }

}
