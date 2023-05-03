/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractDebounceDirective } from './abstract-debounce-directive';

@Directive({
  selector: '[hqDebounce]',
  standalone: true,
})
export class DebounceDirective extends AbstractDebounceDirective {
  constructor(
    protected _elementRef: ElementRef<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    super();
  }
  @HostListener('keyup', ['$event'])
  public onKeyUp(event: any): void {
    event.preventDefault();
    this.emitEvent$.next(this._elementRef?.nativeElement?.value);
  }
}
