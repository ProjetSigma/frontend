import {Pipe} from 'angular2/core';

/*
 * Displays a French phone number in correctly formatted way
 * Usage:
 *   value | phoneNumberFrench
 * Example:
 *   {{ 0600000000 |  phoneNumberFrench}}
 *   formats to: 06 00 00 00 00
*/
@Pipe({name: 'phoneNumberFrench'})
export class PhoneNumberFrenchPipe {
  transform(value:string, args:string[]) : any {
      var phonePattern = /^(\+33|0)(\d)\s*(\d\d)\s*(\d\d)\s*(\d\d)\s*(\d\d)$/;
      if (phonePattern.test(value)) {
          return value.replace(phonePattern,"$1$2 $3 $4 $5 $6");
      } else {
          return value;
      }
  }
}
