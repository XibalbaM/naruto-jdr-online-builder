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
    rank: mongoose.Types.ObjectId;
    bases: {base: mongoose.Types.ObjectId, level: number}[];
    skills: {skill: mongoose.Types.ObjectId, level: number}[];
    nindo: string;
    nindoPoints: number;
    chakraSpes: mongoose.Types.ObjectId[];
    notes: string;
    isPredrawn: boolean;

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
        character.road = modelCharacter.road || undefined;
        character.xp = modelCharacter.xp;
        character.rank = modelCharacter.rank;
        character.bases = modelCharacter.bases;
        character.skills = modelCharacter.skills;
        character.nindo = modelCharacter.nindo;
        character.nindoPoints = modelCharacter.nindoPoints;
        character.chakraSpes = modelCharacter.chakraSpes;
        character.notes = modelCharacter.notes;
        character.isPredrawn = modelCharacter.isPredrawn === undefined ? false : modelCharacter.isPredrawn;

        return character;
    }
}