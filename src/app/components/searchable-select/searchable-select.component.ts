import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
} from 'rxjs';

@Component({
  selector: 'hq-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
})
export class SearchableSelectComponent {
  constructor(private fb: FormBuilder) {
    this.form.controls.stateGroup.valueChanges.subscribe((x) =>
      this._filter.next(x)
    );
  }
  form = this.fb.group({
    stateGroup: [],
  });
  _options = new BehaviorSubject<any[]>([]);
  _filter = new BehaviorSubject<string>('');
  @Input() set options(val: any[]) {
    this._options.next(val);
  }
  //@Input() nestedKey?: string;
  @Input() multiSelect: boolean = false;
  @Input() groupNameProperty = 'name';
  @Input() nestedProperty = 'people';

  options$ = combineLatest([this._options, this._filter]).pipe(
    map(([opts, filter]) => {
      return opts.map((x) =>
        x.people.filter((y: string) => y.startsWith(filter))
      );
    })
  );
}
