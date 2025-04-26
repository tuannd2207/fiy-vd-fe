import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'convertToMbPipe'
})
export class ConvertToMbPipe implements PipeTransform {
    transform(value: number): string {
        return (value / (1024 * 1024)).toFixed(2) + ' MB';
    }
}
