import _Character from 'common/src/interfaces/character.interface';

export default interface Character extends _Character{
    _id: string;
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
    delete newCharacter.shareStatus;
    return newCharacter;
}