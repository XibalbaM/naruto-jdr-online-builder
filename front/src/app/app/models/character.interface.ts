import _Character from "naruto-jdr-online-builder-common/src/interfaces/character.interface";

export default interface Character extends _Character{
    _id: string;
}

export interface PredrawnCharacter extends Character {
    owner: string;
}

export function toCreate(character: Partial<Character>): Partial<Character> {
    const newCharacter = { ...character } as Partial<Character>;
    delete newCharacter._id;
    delete newCharacter.bases;
    delete newCharacter.chakraSpes;
    delete newCharacter.commonSkills;
    delete newCharacter.customSkills;
    delete newCharacter.nindoPoints;
    delete newCharacter.createdAt;
    delete newCharacter.updatedAt;
    return newCharacter;
}

export function dummy(): Character {
    return {
        _id: "",
        bases: [0, 0, 0, 0, 0, 0],
        chakraSpes: [],
        commonSkills: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        customSkills: [],
        nindoPoints: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareStatus: "private"
    } as unknown as Character;
}