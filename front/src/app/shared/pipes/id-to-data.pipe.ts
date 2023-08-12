import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'idToData'
})
export class IdToDataPipe implements PipeTransform {

    transform<T extends { _id: string }>(id: string | undefined, list: T[] | null): T | undefined {
        return list && id ? list.find(item => item._id === id) : undefined;
    }
}
