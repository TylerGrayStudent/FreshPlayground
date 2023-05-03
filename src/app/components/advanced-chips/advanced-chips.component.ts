import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChipChangeEvent {
  item: unknown;
  event: 'selected' | 'unselected';
}

@Component({
  selector: 'hq-advanced-chips',
  templateUrl: './advanced-chips.component.html',
  styleUrls: ['./advanced-chips.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AdvancedChipsComponent implements OnChanges {
  @ViewChild('statusInput') statusInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @Input() availableOptions: unknown[] = [];
  @Input() displayProperty: string;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() mode: 'default' | 'single' = 'default';
  @Input() requireOne = false;
  @Input() idProperty = 'uniqueId';
  @Output() availableOptionsChange = new EventEmitter<void>();
  //shownOptions: string[] = [];
  @Output() selectedStatusChange = new EventEmitter();
  @Output() chipChanged = new EventEmitter<ChipChangeEvent>();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedValues: unknown[] = [];
  searchTerm: Observable<string>;
  input = new BehaviorSubject<string>('');
  filteredStatuses$ = this.input.pipe(map((value) => this._filter(value)));

  remove(object: unknown): void {
    if (!object) return;
    if (this.requireOne && this.selectedValues.length === 1) return;
    const index = this.selectedValues.indexOf(object);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
      this.selectedStatusChange.emit(this.selectedValues);
      this.chipChanged.emit({
        item: object,
        event: 'unselected',
      });
    }

    this.availableOptions.push(object);
    this.sort();
    // This only works with this
    setTimeout(() => {
      this.statusInput.nativeElement.blur();
      this.autocomplete.closePanel();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.availableOptions?.currentValue?.length) {
      this.availableOptionsChange.emit();
    }
  }

  sort(): void {
    if (this.displayProperty) {
      this.availableOptions.sort((a, b) => {
        if (a[this.displayProperty] < b[this.displayProperty]) return -1;
        if (a[this.displayProperty] > b[this.displayProperty]) return 1;
        return 0;
      });
    } else {
      this.availableOptions.sort();
    }
  }

  selectById(id: string): void {
    const val = this.availableOptions?.find(
      (x: any) => x[this.idProperty] === id
    );
    if (val) this._handleSelection(val);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._handleSelection(event.option.value);
  }

  _handleSelection(val: unknown): void {
    if (this.mode === 'single') {
      this.remove(this.selectedValues[0]);
      this.chipChanged.emit({
        item: this.selectedValues[0],
        event: 'unselected',
      });
    }
    this.selectedValues.push(val);
    this.chipChanged.emit({
      item: val,
      event: 'selected',
    });
    this.availableOptions = this.availableOptions.filter(
      (status) => status !== val
    );
    this.selectedStatusChange.emit(this.selectedValues);
    this.sort();
    this.statusInput.nativeElement.value = '';
    this.input.next(null);
    setTimeout(() => {
      this.statusInput.nativeElement.blur();
    }, 0);
  }

  reset(): void {
    // This moves all the elements from selected values to available options
    this.availableOptions = this.availableOptions.concat(this.selectedValues);
    this.selectedValues.forEach((x) => {
      this.chipChanged.emit({
        item: x,
        event: 'unselected',
      });
    });
    this.selectedValues = [];
    setTimeout(() => {
      this.statusInput.nativeElement.blur();
    }, 0);
    this.selectedStatusChange.emit(this.selectedValues);
  }

  private _filter(value: string): unknown[] {
    if (!value) {
      return this.availableOptions;
    }

    const filterValue = value.toLowerCase();

    return this.availableOptions.filter(
      (x) =>
        (this.displayProperty ? x[this.displayProperty] : x)
          .toString()
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }
}
