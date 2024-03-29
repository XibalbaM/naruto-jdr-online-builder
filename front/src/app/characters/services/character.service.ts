import {Injectable} from '@angular/core';
import {combineLatest, map, Observable, tap} from "rxjs";
import {ApiService} from "../../app/services/api.service";
import Auth from "../../app/models/auth.model";
import {AuthService} from "../../app/services/auth.service";
import Character from "../../app/models/character.model";

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(private apiService: ApiService, private auth: Auth, private authService: AuthService) {
    }

    removeSkill(id: string, characterId: string): Observable<boolean> {
        return this.setSkillLevel(characterId, id, 0);
    }

    setSkillLevel(characterId: string, skillId: string | number, level: number): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.SKILL(characterId, skillId, typeof skillId === "string"), {value: level}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success) {
                    const character = this.auth.user!.characters.find((character) => character._id === characterId)!;
                    if (typeof skillId === "string") {
                        if (level === 0)
                            character.customSkills = character.customSkills.filter((skill) => skill.skill !== skillId);
                        else if (!character.customSkills.find((skill) => skill.skill === skillId))
                            character.customSkills.push({skill: skillId, level});
                        else
                            character.customSkills.find((skill) => skill.skill === skillId)!.level = level;
                    }
                    else
                        character.commonSkills[skillId] = level;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setBaseLevel(characterId: string, baseId: number, level: number): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.BASE(characterId, baseId), {value: level}).pipe(
            map((response) => response.status === 200)
        );
    }

    setNindoPoints(characterId: string, points: number): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.NINDO_POINTS(characterId), {points}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.nindoPoints = points;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setVillage(characterId: string, village: string, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.VILLAGE(characterId), {id: village}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.village = village;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setFirstName(characterId: string, firstName: string, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.FIRST_NAME(characterId), {text: firstName}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.firstName = firstName;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setClan(characterId: string, clan: string, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.CLAN(characterId), {id: clan}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.clan = clan;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setXp(characterId: string, xp: number, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.XP(characterId), {xp}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.xp = xp;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setRoad(characterId: string, road: string, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.ROAD(characterId), {id: road}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.road = road;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setRank(characterId: string, rank: string, multi: boolean = false) {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.RANK(characterId), {id: rank}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.rank = rank;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setNotes(characterId: string, notes: string, multi: boolean = false) {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.NOTES(characterId), {text: notes}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.notes = notes;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    setChakraSpe(characterId: string, speIndex: number, speId: string, multi: boolean = false): Observable<boolean> {
        return this.apiService.doRequest('POST', CharacterApiEndpoints.CHAKRA_SPE(characterId, speIndex), {id: speId}).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success && !multi) {
                    this.auth.user!.characters.find((character) => character._id === characterId)!.chakraSpes[speIndex] = speId;
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    copyCharacter(characterId: string): Observable<{
        character?: Character,
        success: boolean
    }> {
        return this.apiService.doRequest<{
            character: Character
        }>('PUT', `/characters/${characterId}`).pipe(
            map((response) => ({character: response.body?.character, success: response.status === 200})),
            tap((data) => {
                if (data.success) {
                    this.auth.user!.characters.push(data.character!);
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    deleteCharacter(characterId: string): Observable<boolean> {
        return this.apiService.doRequest('DELETE', `/characters/${characterId}`).pipe(
            map((response) => response.status === 200),
            tap((success) => {
                if (success) {
                    this.auth.user!.characters = this.auth.user!.characters.filter((character) => character._id !== characterId);
                    this.auth.user = this.auth.user;
                }
            })
        );
    }

    multiRequest(requests: Observable<boolean>[]): Observable<boolean> {
        return combineLatest(requests).pipe(
            map((results) => results.every((result) => result)),
            tap((success) => {
                if (success)
                    this.authService.refreshUser();
            })
        );
    }
}

export const CharacterApiEndpoints = {
    VILLAGE(characterId: string): string {
        return `/characters/${characterId}/village`;
    },
    FIRST_NAME(characterId: string): string {
        return `/characters/${characterId}/name`;
    },
    CLAN(characterId: string): string {
        return `/characters/${characterId}/clan`;
    },
    XP(characterId: string): string {
        return `/characters/${characterId}/xp`;
    },
    ROAD(characterId: string): string {
        return `/characters/${characterId}/road`;
    },
    NINDO_POINTS(characterId: string): string {
        return `/characters/${characterId}/nindoPoints`;
    },
    BASE(characterId: string, baseId: number): string {
        return `/characters/${characterId}/bases/${baseId}`;
    },
    SKILL(characterId: string, skillId: string | number, isCustom: boolean): string {
        return `/characters/${characterId}/skills/${isCustom ? "custom" : "common"}/${skillId}`;
    },
    RANK(characterId: string): string {
        return `/characters/${characterId}/rank`;
    },
    NOTES(characterId: string): string {
        return `/characters/${characterId}/notes`;
    },
    CHAKRA_SPE(characterId: string, speIndex: number): string {
        return `/characters/${characterId}/spes/${speIndex}`;
    }
}