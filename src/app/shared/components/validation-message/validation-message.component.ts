import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const validateMessage = {
  'required': 'Bagian %s wajib diisi',
  'minlength': 'Bagian %s minimal harus lebih panjang dari %s karakter',
}

@Component({
  selector: 'app-validation-message, [validation-message]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() label: string = '';


  messages: { [key: string]: string } = validateMessage;
  isFieldValid(): boolean {
    return this.control.invalid && this.control.touched;
  }

  displayError(): string {
    let message: string = '';
    const errors = this.control.errors;

    for (let key in errors) {
      const error: string[] = errors[key] ? Object.values(errors[key]) : [];
      const params: any[] = [this.label].concat(error);
      const valMessage: string = this.messages[key];

      message += `<p class="m-0">${this.formatString(valMessage, params)}</p>`
    }
    return message;
  }


  private formatString(valMessage: string, params: any[]): string {
    let i = 0;
    return (valMessage ? valMessage.replace(/%s/g, () => params.slice(i, ++i) as any) : '')
  }

  ngOnInit(): void {
  }

}
