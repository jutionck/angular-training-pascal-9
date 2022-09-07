import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatService {
  public format(text: string, ...params: any[]): string | undefined {
    const args = Array.prototype.slice.call(params);
    const rep = args.slice(0, args.length);
    let i = 0;

    return text
      ? text.replace(/%s|%d|%f|%@/g, () => {
        return rep.slice(i, ++i) as any;
      })
      : undefined;
  }
}
