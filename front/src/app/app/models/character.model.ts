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
    shareStatus!: "private" | "not-referenced" | "public" | "predrawn";

    constructor(character?: Character) {
        if (character) Object.assign(this, character);
    }

    toCreate() {
        const character: any = new Character(this);
        delete character._id;
        delete character.bases;
        delete character.skills;
        delete character.chakraSpes;
        delete character.commonSkills;
        delete character.customSkills;
        delete character.nindoPoints;
        delete character.createdAt;
        delete character.updatedAt;
        delete character.shareStatus;
        return character;
    }
}
