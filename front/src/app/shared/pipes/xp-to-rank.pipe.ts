import {Pipe, PipeTransform} from '@angular/core';
import Rank from "../../app/models/rank.model";
import {DataService} from "../../app/services/data.service";

@Pipe({
    name: 'xpToRank'
})
export class XpToRankPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(xp: number): Rank {
        for (const rank of this.dataService.ranks.getValue().sort((a, b) => b.minXp - a.minXp)) {
            if (rank.minXp < xp) {
                return rank;
            }
        }
        return this.dataService.ranks.getValue()[0];
    }
}
