import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numberOnly]'
})

/**
 * NumberOnlyDirective directive is used to check and filter
 * the character other than number when typed in the input field
 */
export class NumberOnlyDirective {

  /**
   * Default constructor with ElementRef as its dependency injector
   * 
   * @param elementRef - ElementRef class is used to process data
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * onInputChange method triggers based on input change event
   *  
   * @param event - change event captured during onInputChange  
   */
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

    if (initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
