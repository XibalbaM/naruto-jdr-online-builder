import {Pipe, PipeTransform} from '@angular/core';
import {idToData} from 'naruto-jdr-online-builder-common/src/utils/character.utils';

@Pipe({
    name: 'idToData',
    standalone: true
})
export class IdToDataPipe implements PipeTransform {

    transform<T extends { _id: any }>(input: string | number | {id: string, clanName?: string} | undefined, list: T[] | null): T | undefined {
        return idToData(input, list);
    }
}
