import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: string, args: { [key: string]: any }): string {
    if (!value) return value;
    return value.replace(/\{\{(.*?)\}\}/g, (match, key) => args[key.trim()]);
  }

}
