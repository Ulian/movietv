import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageHover]'
})
export class ImageHoverDirective {
  el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.classList.remove('zoom-out');
    this.el.classList.add('zoom-in');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.classList.remove('zoom-in');
    this.el.classList.add('zoom-out');
  }
}
