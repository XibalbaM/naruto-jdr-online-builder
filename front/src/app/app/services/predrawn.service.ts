import {Injectable} from '@angular/core';
import Character, {PredrawnCharacter} from "../models/character.interface";
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PredrawnService {

    constructor(private apiService: ApiService) {
    }

    getPredrawnCharacters(): Observable<PredrawnCharacter[]> {
        return this.apiService.doRequest<{ characters: { character: Character, ownerName: string }[] }>("GET", "/predrawn").pipe(
            map((response) => {
                if (response.status !== 200 || response.body === null) {
                    return [];
                } else {
                    return response.body.characters.map((character) => ({
                        ...character.character,
                        owner: character.ownerName
                    }));
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
}