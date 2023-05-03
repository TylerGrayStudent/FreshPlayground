import { Component, VERSION } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { UsernameValidator } from './username.validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  constructor(private fb: FormBuilder, private userService: UserService) {}

  registrationForm = this.fb.group({
    name: [null, [Validators.minLength(3), Validators.required]],
    username: [
      null,
      [Validators.minLength(3), Validators.required],
      [UsernameValidator.createValidator(this.userService)],
    ],
  });
}
