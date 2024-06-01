/**
 * Class representing a character
 * @class Character
 */
export default class Character {
    _id!: string;
    firstName!: string;
    clan!: string;
    village!: string;
    road?: string;
    xp!: number;
    rank!: string;
    bases: number[] = [];
    commonSkills: number[] = [];
    customSkills: {skill: string, level: number}[] = [];
    nindo!: string;
    nindoPoints!: number;
    chakraSpes: string[] = [];
    notes!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(character?: Character) {
        if (character) Object.assign(this, character);
    }
}

export type CharacterInfo = {_id: string, name: string, xp: number};