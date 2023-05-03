export const numbersOnlyRegex = /^[0-9]*$/;
export const charactersOnlyRegex = /^[a-zA-Z]*$/;
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return null; // Always pass validation
  };
}
