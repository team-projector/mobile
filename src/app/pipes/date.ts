import { Pipe, PipeTransform } from '@angular/core';
import { differenceInSeconds } from 'date-fns';

export enum DurationFormat {
    full = 'full',
    short = 'short'
}

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
    transform(seconds: number, format: DurationFormat = DurationFormat.full): string {
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        switch (format) {
            case DurationFormat.short:
                if (hours > 0) {
                    return `${hours}h` + (min > 0 ? '+' : '');
                } else if (min > 0) {
                    return `${min}m` + (sec > 0 ? '+' : '');
                } else if (sec > 0) {
                    return `${sec}s`;
                }
                break;
            default:
                const units = [
                    {value: hours, unit: 'h'},
                    {value: min, unit: 'm'},
                    {value: sec, unit: 's'}
                ];

                return units.filter(m => !!m.value)
                    .map(u => [u.value, u.unit].join('')).join(' ');
        }
    }
}

@Pipe({name: 'diff'})
export class DifferencePipe implements PipeTransform {
    transform(date: string | Date, now: string | Date = null): number {
        return differenceInSeconds(now || new Date(), date);
    }
}
