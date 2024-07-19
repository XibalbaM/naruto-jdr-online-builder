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
    bases: number[];
    commonSkills: number[];
    customSkills: {skill: mongoose.Types.ObjectId, level: number}[];
    nindo: string;
    nindoPoints: number;
    chakraSpes: mongoose.Types.ObjectId[];
    notes: string;
    shareStatus: "private" | "not-referenced" | "public" | "predrawn";
    createdAt: Date;
    updatedAt: Date;

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
        character.road = modelCharacter.road ?? undefined;
        character.xp = modelCharacter.xp;
        character.rank = modelCharacter.rank;
        character.bases = modelCharacter.bases;
        character.commonSkills = modelCharacter.commonSkills;
        character.customSkills = modelCharacter.customSkills;
        character.nindo = modelCharacter.nindo;
        character.nindoPoints = modelCharacter.nindoPoints;
        character.chakraSpes = modelCharacter.chakraSpes;
        character.notes = modelCharacter.notes;
        character.shareStatus = modelCharacter.shareStatus ?? "private";
        character.createdAt = modelCharacter.createdAt ?? new Date(0);
        character.updatedAt = modelCharacter.updatedAt ?? new Date(0);

        return character;
    }
}