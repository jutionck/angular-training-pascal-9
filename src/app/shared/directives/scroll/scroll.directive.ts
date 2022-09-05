import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(): void {
    let element = document.querySelector('#header') as HTMLElement;
    if (window.pageYOffset > 100) {
      element.classList.add('header-scrolled');
    } else {
      element.classList.remove('header-scrolled');
    }
  }
}
