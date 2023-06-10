import mongoose from "mongoose";
import Clan from "./clan.class.js";
import Village from "./village.class.js";
import Road from "./road.class.js";
import Base from "./base.class.js";
import Skill from "./skill.class.js";

/**
 * Describes a character, in a more convenient and lightweight way than the model
 * @Class Character
 */
export default class Character {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    clan: Clan | mongoose.Types.ObjectId;
    village: Village | mongoose.Types.ObjectId;
    road?: Road | mongoose.Types.ObjectId;
    level: string;
    rank: string;
    xp: number;
    nindo: string;
    nindoPoints: number;
    story: string;
    bases: Map<Base, number>;
    skills: Map<Skill | mongoose.Types.ObjectId, number>;

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
        character.road = modelCharacter.road;
        character.level = modelCharacter.level;
        character.rank = modelCharacter.rank;
        character.xp = modelCharacter.xp;
        character.nindo = modelCharacter.nindo;
        character.nindoPoints = modelCharacter.nindoPoints;
        character.story = modelCharacter.story;
        character.bases = modelCharacter.bases;
        character.skills = modelCharacter.skills;

        return character;
    }
}