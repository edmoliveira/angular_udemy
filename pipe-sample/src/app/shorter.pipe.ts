import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShorterPipe implements PipeTransform {
    transform(value: any, limit: number) {
        const valueSafe = (value || '');

        if(valueSafe.length > limit) {
            return valueSafe.substr(0, limit) + ' ...';
        }
        
        return value;
    }
}