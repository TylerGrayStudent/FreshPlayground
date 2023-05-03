import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  ElementRef,
  TemplateRef,
  OnChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DebounceDirective } from '../../directives/debounce.directive';

@Component({
  selector: 'hq-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    DebounceDirective,
    MatAutocompleteModule,
    ScrollingModule,
  ],
})
export class AutocompleteComponent implements OnChanges {
  @ContentChild('inputAutoComplete')
  public inputAutoComplete: TemplateRef<ElementRef>;

  @Input() autocompleteOptions: string[] = [];
  @Input() itemSize = 25;

  public height: string;

  ngOnChanges(): void {
    this.RecomputeSizeViewport();
  }

  public RecomputeSizeViewport(): void {
    // Recompute how big the viewport should be.
    if (this.autocompleteOptions?.length < 4) {
      this.height = this.autocompleteOptions?.length * 50 + 'px';
    } else {
      this.height = '200px';
    }
  }
}
