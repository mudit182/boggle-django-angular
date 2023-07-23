import { Directive, ElementRef, OnInit, HostListener, HostBinding, Input, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appSelectionListItemHover]'
})
export class SelectionListItemHoverDirective implements AfterViewInit, OnChanges {
  @HostBinding('style.backgroundColor') bgColor: string;
  @Input() alreadySelectedListItem: boolean;
  highlightColor: string;
  selectedColor: string;
  highlightSelectedColor: string;


  constructor(private elRef: ElementRef) {
    this.highlightColor = 'rgba(94, 94, 94, 0.2)';
    this.selectedColor = 'rgba(94, 40, 40, 0.4)';
    this.highlightSelectedColor = 'rgba(94, 70, 70, 0.6)';
  }

  ngAfterViewInit() {
    if (this.alreadySelectedListItem) {
      this.bgColor = this.selectedColor;
    } else {
      this.bgColor = 'transparent';
    }
  }

  ngOnChanges() {
    if (this.alreadySelectedListItem) {
      this.bgColor = this.selectedColor;
    } else {
      this.bgColor = 'transparent';
    }
  }

  @HostListener('mouseenter') mouseon() {
    if (this.alreadySelectedListItem) {
      this.bgColor = this.highlightSelectedColor;
    } else {
      this.bgColor = this.highlightColor;
    }
  }

  @HostListener('mouseleave') mouseoff() {
    if (this.alreadySelectedListItem) {
      this.bgColor = this.selectedColor;
    } else {
      this.bgColor = 'transparent';
    }
  }

}
