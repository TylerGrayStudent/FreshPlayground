import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime, map, Observable, of, switchMap, timer } from 'rxjs';
import { UserService } from './user.service';

export class UsernameValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return timer(500).pipe(
        debounceTime(100),
        map((isValid) => (isValid ? { mobileNumberExist: true } : null))
      );
      // return userService.checkIfUsernameExists(control.value).pipe(
      //   tap((x) => {
      //     console.log(x);
      //   }),
      //   map((result: boolean) =>
      //     result ? { usernameAlreadyExists: true } : null
      //   )
      // );
    };
  }
}
