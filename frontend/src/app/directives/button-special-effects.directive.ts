import { Directive, ElementRef, HostListener, HostBinding, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appButtonSpecialEffects]'
})
export class ButtonSpecialEffectsDirective implements OnInit {
  @Input() shadowEffect = true;
  @Input() fontSizeInEm: number;
  enlargedFontSizeInEm: number;
  widthInPx: number;
  enlargedWidthInPx: number;
  heightInPx: number;
  enlargedHeightInPx: number;
  boxShadowAsStr: string;
  enlargedBoxShadowAsStr: string;

  @HostBinding('style.fontSize') fontSize: string;
  @HostBinding('style.boxShadow') boxShadow: string;
  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    this.enlargedFontSizeInEm = this.fontSizeInEm + 0.05;

    this.widthInPx = this.elRef.nativeElement.offsetWidth;
    this.enlargedWidthInPx = this.widthInPx + 3;

    this.heightInPx = this.elRef.nativeElement.offsetHeight;
    this.enlargedHeightInPx = this.heightInPx + 2;

    this.boxShadowAsStr =  '2px 1px 3px grey';
    this.enlargedBoxShadowAsStr = '3px 2px 5px 3px grey';

    this.unFocusButton();
  }

  @HostListener('mouseenter') mouseon() {
    this.focusButton();
  }

  @HostListener('mouseleave') mouseoff() {
    this.unFocusButton();
  }

  @HostListener('click') mouseclick() {
    if (this.shadowEffect) {
      this.boxShadow = 'none';
      setTimeout(() => {
        this.boxShadow = this.enlargedBoxShadowAsStr;
      }, 50);
    }
  }

  unFocusButton() {
    this.fontSize = this.fontSizeInEm.toString() + 'em';
    this.width = this.widthInPx.toString() + 'px';
    this.height = this.heightInPx.toString() + 'px';
    if (this.shadowEffect) {
      this.boxShadow = this.boxShadowAsStr;
    }
  }

  focusButton() {
    this.fontSize = this.enlargedFontSizeInEm.toString() + 'em';
    this.width = this.enlargedWidthInPx.toString() + 'px';
    this.height = this.enlargedHeightInPx.toString() + 'px';
    if (this.shadowEffect) {
      this.boxShadow = this.enlargedBoxShadowAsStr;
    }
  }
}
