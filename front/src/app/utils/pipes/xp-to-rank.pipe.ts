import {Pipe, PipeTransform} from '@angular/core';
import Rank from "../../app/models/rank.interface";
import {DataService} from "../../app/services/data.service";

@Pipe({
    name: 'xpToRank',
    standalone: true
})
export class XpToRankPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(xp: number): Rank {
        for (const rank of this.dataService.ranks.sort((a, b) => b.minXp - a.minXp)) {
            if (rank.minXp < xp) {
                return rank;
            }
        }
        return this.dataService.ranks[0];
    }
}
