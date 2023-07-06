import mongoose from "mongoose";

/**
 * Describes a character, in a more convenient and lightweight way than the model
 * @Class Character
 */
export default class Character {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    clan: mongoose.Types.ObjectId;
    village: mongoose.Types.ObjectId;
    road?: mongoose.Types.ObjectId;
    xp: number;
    bases: Map<mongoose.Types.ObjectId, number>;
    skills: Map<mongoose.Types.ObjectId, number>;
    nindo: string;
    nindoPoints: number;
    chakraSpes: Map<mongoose.Types.ObjectId, number>;
    story: string;

    /**
     * Creates a new character from a model
     * @param modelCharacter The model to create the character from
     */
    static fromModel(modelCharacter): Character {

        const character = new Character();
        character._id = modelCharacter._id;
        character.firstName = modelCharacter.firstName;
        character.clan = modelCharacter.clan;
        character.village = modelCharacter.village;
        character.xp = modelCharacter.xp;
        character.bases = modelCharacter.bases;
        character.skills = modelCharacter.skills;
        character.nindo = modelCharacter.nindo;
        character.nindoPoints = modelCharacter.nindoPoints;
        character.chakraSpes = modelCharacter.chakraSpes;
        character.story = modelCharacter.story;

        return character;
    }
}