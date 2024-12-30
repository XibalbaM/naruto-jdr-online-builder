import {Injectable} from '@angular/core';
import Character, {toCreate} from "../../app/models/character.interface";
import Village from "../../app/models/village.interface";
import Clan from "../../app/models/clan.interface";
import Road from "../../app/models/road.interface";
import {XpToRankPipe} from "../../utils/pipes/xp-to-rank.pipe";
import {catchError, map, mergeMap, Observable, of, tap, zip} from "rxjs";
import {ApiService} from "../../app/services/api.service";
import Auth from "../../app/models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class CreationService {

    character: Partial<Character> = {};
    step: number = 1;
    tempSkillIds: string[] = [];

    constructor(private rankPipe: XpToRankPipe, private apiService: ApiService, private auth: Auth) {
    }

    /**
     * Get data from the first step of the creation process.
     * @param village The village of the character.
     * @param firstName The first name of the character.
     * @param clan The clan of the character.
     * @param xp The xp of the character.
     * @param shareStatus The share status of the character.
     * @param road The road of the character.
     */
    stepOne(village: Village, firstName: string, clan: {id: string, clanName?: string}, xp: number, shareStatus: "private" | "not-referenced" | "public", road?: Road) {

        this.character.village = village._id;
        this.character.firstName = firstName;
        this.character.clan = clan;
        this.character.xp = xp;
        this.character.rank = this.rankPipe.transform(xp)._id;
        this.character.shareStatus = shareStatus;
        this.character.road = road?._id;

        this.step = 2;
    }

    /**
     * Get data from the second step of the creation process.
     * @param nindo The nindo of the character.
     * @param story The story of the character.
     */
    stepTwo(nindo: string, story?: string) {

        this.character.nindo = nindo;
        this.character.notes = story || "";

        this.step = 3;
    }

    /**
     * Get data from the third step of the creation process.
     * @param skillIds The skills of the character, including the clan skills.
     * @param token The google recaptcha token.
     */
    stepThree(skillIds: string[], token: string): Observable<{ success: boolean, id?: string }> {

        return this.apiService.doRequest<{ character: Character }>("POST", "/characters", {
            character: toCreate(this.character),
            captcha: token
        }).pipe(
            map((response) => {
                if (response.status !== 201 || !response.body || !response.body.character) {
                    throw new Error("Error while creating the character.");
                } else {
                    return response.body.character;
                }
            }),
            mergeMap((character) => {
                return zip([
                    of(character),
                    ...skillIds.map((skillId) => this.apiService.doRequest("POST", "/characters/" + character._id + "/skills/custom/" + skillId, {value: 1}).pipe(map((response) => {
                        return response.status === 200;
                    })))
                ]);
            }),
            map((results) => {
                if (results.includes(false)) {
                    throw new Error("Error while creating the character.");
                } else {
                    return results[0];
                }
            }),
            map((character) => {
                skillIds.forEach((skillId) => {
                    character.customSkills.push({skill: skillId, level: 1});
                });
                return character;
            }),
            tap((character) => {
                this.character = {};
                this.tempSkillIds = [];
                this.step = 1;
                if (this.auth.user) {
                    this.auth.user = {
                        ...this.auth.user,
                        characters: [
                            ...this.auth.user.characters,
                            character
                        ]
                    }
                }
            }),
            map((character) => ({success: true, id: character._id})),
            catchError((error) => {
                console.error(error);
                return of({success: false});
            })
        );
    }
}
