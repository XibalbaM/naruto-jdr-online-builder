import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'idToData',
    standalone: true
})
export class IdToDataPipe implements PipeTransform {

    transform<T extends { _id: any }>(id: string | number | undefined, list: T[] | null): T | undefined {
        return list && id !== undefined ? list.find(item => item._id === id) : undefined;
    }
}
