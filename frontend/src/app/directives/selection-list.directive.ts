import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSelectionList]'
})
export class SelectionListDirective implements AfterViewInit {
  list: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.list = this.elementRef.nativeElement.querySelector('ul');
    this.renderer.setStyle(this.list, 'display', 'none');
  }

  @HostListener('click') mousehover() {
    this.renderer.setStyle(this.list, 'display', 'block');
    const listHeight = window.innerHeight - this.elementRef.nativeElement.getBoundingClientRect().top;
    this.renderer.setStyle(this.list, 'max-height', listHeight.toString() + 'px');
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(this.list, 'display', 'none');
  }

}
