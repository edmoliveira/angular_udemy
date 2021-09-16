import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false //don't use. low performance
})
export class FilterPipe implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        if(value.length === 0 || (filterString || '').trim() === '') {
            return value;
        }

        const resultArray = [];

        for(const item of value) {
            if(item[propName].indexOf(filterString) > -1) {
                resultArray.push(item);
            }
        }

        return resultArray;
    }
}