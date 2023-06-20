import {Injectable} from '@angular/core';
import Character from "../../app/models/character.model";
import Village from "../../app/models/village.model";
import Clan from "../../app/models/clan.model";
import Road from "../../app/models/road.model";
import Skill from "../../app/models/skill.model";
import Base from "../../app/models/base.model";
import {DataService} from "../../app/services/data.service";
import {XpToRankPipe} from "../../shared/pipes/xp-to-rank.pipe";

@Injectable({
    providedIn: 'root'
})
export class CreationService {

    character: Character = new Character();
    step: number = 1;

    constructor(private dataService: DataService, private rankPipe: XpToRankPipe) {
    }

    /**
     * Get data from the first step of the creation process.
     * @param village The village of the character.
     * @param firstName The first name of the character.
     * @param clan The clan of the character.
     * @param xp The xp of the character.
     * @param road The road of the character.
     */
    stepOne(village: Village, firstName: string, clan: Clan, xp: number, road?: Road) {

        this.character.village = village;
        this.character.firstName = firstName;
        this.character.clan = clan;
        this.character.rank = this.rankPipe.transform(xp);
        this.character.xp = xp;
        this.character.road = road;

        this.step = 2;
    }

    /**
     * Get data from the second step of the creation process.
     * @param nindo The nindo of the character.
     * @param story The story of the character.
     */
    stepTwo(nindo: string, story: string) {

        this.character.nindo = nindo;
        this.character.story = story;

        this.step = 3;
    }

    /**
     * Get data from the third step of the creation process.
     * @param skills The skills of the character, including the clan skills.
     */
    stepThree(skills: Skill[]) {
        this.character.skills = new Map<Skill, number>();

        for (let skill of skills) {
            this.character.skills.set(skill, 1);
        }

        this.step = 1;
        this.character.bases = new Map<Base, number>();
        this.dataService.bases.getValue().forEach(base => {
            this.character.bases.set(base, 1);
        })
        //TODO: Send the character to the API.
    }
}
