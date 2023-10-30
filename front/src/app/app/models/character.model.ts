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
    bases: { base: string, level: number }[] = [];
    skills: { skill: string, level: number }[] = [];
    nindo!: string;
    nindoPoints!: number;
    chakraSpes: string[] = [];
    notes!: string;

    constructor(character?: Character) {
        if (character) Object.assign(this, character);
    }

    toCreate() {
        const character: any = new Character(this);
        delete character._id;
        delete character.bases;
        delete character.skills;
        delete character.chakraSpes;
        return character;
    }
}
