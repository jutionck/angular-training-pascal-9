import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe implements PipeTransform {
  transform(value: string, formatDate: string, locale: Locale = id): string {
    return format(new Date(), formatDate, { locale });
  }
}
