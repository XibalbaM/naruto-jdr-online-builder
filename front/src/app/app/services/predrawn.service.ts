import {Injectable} from '@angular/core';
import Character from "../models/character.interface";
import {ApiService} from "./api.service";
import {map, mergeMap, Observable, of, zip} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PredrawnService {

    constructor(private apiService: ApiService) {
    }

    getPredrawnCharacters(): Observable<Character[]> {
        return this.apiService.doRequest<{ characters: string[] }>("GET", "/predrawn").pipe(
            map((response) => {
                if (response.status !== 200 || response.body === null) {
                    return [];
                } else {
                    return response.body.characters;
                }
            }),
            mergeMap((characterIds) => {
                const requests = characterIds.map((characterId) => this.apiService.doRequest<{ character: Character }>("GET", "/characters/" + characterId));
                return zip(...requests, of(null));
            }),
            map((responses) => {
                return responses.filter(response => response && response.status === 200 && response.body !== null).map(response => response!.body!.character);
            })
        );
    }

    takePredrawnCharacter(characterId: string): Observable<{ success: boolean, character?: Character }> {
        return this.apiService.doRequest<{ character: Character }>("PUT", "/predrawn/" + characterId).pipe(
            map((response) => {
                if (response.status === 200 && response.body !== null) {
                    return {
                        success: true,
                        character: response.body.character
                    };
                } else {
                    return {
                        success: false
                    };
                }
            })
        );
    }

    addPredrawnCharacter(characterId: string): Observable<{ success: boolean, id?: string }> {

        return this.apiService.doRequest<{ id: string }>("POST", "/predrawn", {id: characterId}).pipe(
            map((response) => ({
                success: response.status === 201 && response.body?.id !== null,
                id: response.body?.id
            }))
        );
    }

    removePredrawnCharacter(characterId: string) {
        return this.apiService.doRequest("DELETE", "/predrawn/" + characterId).pipe(
            map((response) => response.status === 200)
        );
    }
}