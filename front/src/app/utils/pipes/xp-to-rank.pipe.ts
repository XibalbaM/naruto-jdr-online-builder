import {Pipe, PipeTransform} from '@angular/core';
import Rank from "../../app/models/rank.interface";
import {DataService} from "../../app/services/data.service";
import {xpToRank} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'xpToRank',
    standalone: true
})
export class XpToRankPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(xp: number): Rank {
        return xpToRank(xp, this.dataService.ranks);
    }
}
