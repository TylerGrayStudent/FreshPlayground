import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DebounceDirective } from '../../directives/debounce.directive';
import {
  charactersOnlyRegex,
  numbersOnlyRegex,
} from '../../validation/sharedValidation';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'hq-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    AutocompleteComponent,
    MatAutocompleteModule,
    DebounceDirective,
    MatButtonModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent implements OnChanges, ControlValueAccessor {
  @Input() label = 'Filter';
  @Input() placeholder = 'Search...';
  @Input() hqFilterType: 'all' | 'number' | 'letter' = 'all';
  @Input() autocompleteOptions: string[] = [];

  @Output() filterChange = new EventEmitter<string>();
  public filterFormControl = new UntypedFormControl(
    '',
    this.getValidatorByFilterType(this.hqFilterType)
  );

  private getErrorByFilterType = (typeEnum: string) => {
    switch (typeEnum) {
      case 'letter':
        return 'Just allow letters';
      case 'number':
        return 'Just allow numbers';
      default:
        break;
    }
  };

  public error = this.getErrorByFilterType(this.hqFilterType);

  ngOnChanges(changes: SimpleChanges): void {
    this.filterFormControl.setValidators(
      this.getValidatorByFilterType(this.hqFilterType)
    );

    this.error = this.getErrorByFilterType(this.hqFilterType);
  }

  private getValidatorByFilterType(typeEnum: string): ValidatorFn {
    switch (typeEnum) {
      case 'letter':
        return Validators.pattern(charactersOnlyRegex);
      case 'number':
        return Validators.pattern(numbersOnlyRegex);
      default:
        break;
    }
  }

  onFilterChange(filter: string): void {
    this.onChange(filter);
    this.filterChange.emit(filter);
  }

  onClearClick(): void {
    this.filterFormControl.setValue('');
    this.onChange('');
    this.filterChange.emit(this.filterFormControl.value);
  }

  writeValue(value: string): void {
    if (value) this.filterFormControl.setValue(value, { emitEvent: false });
  }
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.filterFormControl.disable();
    } else {
      this.filterFormControl.enable();
    }
  }
}
