import { Directive, HostBinding, Input } from '@angular/core';

enum ButtonColor {
  primary = 'btn-primary',
  success = 'btn-success',
  warning = 'btn-warning',
  danger = 'btn-danger',
  secondary = 'btn-secondary',
}

enum ButtonSize {
  lg = 'btn-lg',
  md = '',
  sm = 'btn-sm'
}

@Directive({
  selector: '[appBsButton]'
})
export class BsButtonDirective {
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' = 'primary';
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() disabled?: any;

  @HostBinding('class')
  get applyStyles(): string {
    const buttonColor: ButtonColor = ButtonColor[this.color];
    const buttonSize: ButtonSize = ButtonSize[this.size];
    const disabled: string = !(this.disabled === false) ? 'disabled' : '';

    return `btn ${buttonColor} ${buttonSize}`;
    // btn btn-primary btn-lg disabled
  }
}
