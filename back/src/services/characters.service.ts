import Character from "../classes/character.class.js";
import mongoose, {ObjectId} from "mongoose";
import User from "../classes/user.class.js";
import CharacterModel from "../models/character.model.js";
import UserModel from "../models/user.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import ChakraSpe from "../classes/chakraSpe.class.js";
import SkillModel from "../models/skill.model.js";
import Skill from "../classes/skill.class.js";
import VillageModel from "../models/village.model.js";
import ClanModel from "../models/clan.model.js";
import RoadModel from "../models/road.model.js";
import RankModel from "../models/rank.model.js";
import Clan from "../classes/clan.class.js";
import BaseModel from "../models/base.model.js";

export default class CharactersService {

    static async canUserReadCharacter(userId: ObjectId, character: Character) {
        if (character.isPredrawn) return true;
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        return userCharactersIds.includes(character._id)
    }

    static async listCharacters(user: User) {
        const characters: Character[] = [];
        for (let character of user.characters) {
            characters.push(Character.fromModel(await CharacterModel.findById(character)));
        }
        return characters;
    }

    static async createCharacter(userId: ObjectId, body: { character: Omit<Character, "_id" | "bases" | "skills" | "chakraSpes" | "nindoPoints"> }) {
        const character = Character.fromModel(await CharacterModel.create(body.character));
        await UserModel.findByIdAndUpdate(userId, {$push: {characters: character._id}});
        return character;
    }

    static async getCharacter(userId: ObjectId, characterId: string) {
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if (!await this.canUserReadCharacter(userId, character)) {
            throw new Error("Character not found");
        }
        return character;
    }

    static async copyCharacter(userId: ObjectId, characterId: string) {
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if (!await this.canUserReadCharacter(userId, character)) {
            throw new Error("Character not found");
        }
        delete character._id;
        character.isPredrawn = false;
        character.firstName = "(Copie) " + character.firstName;
        const newCharacter = Character.fromModel(await CharacterModel.create(character));
        await UserModel.findByIdAndUpdate(userId, {$push: {characters: newCharacter._id}});
        return newCharacter;
    }

    static async setSkill(userId: ObjectId, characterId: string, skillId: string, value: number) {
        const skill = Skill.fromModel(await SkillModel.findById(skillId));
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if ((value < ((skill.type === "common" || skill.type === "clan") ? 1 : 0)) || value > character.bases.find(base => base.base.toString() === skill.base.toString())?.level + 2) {
            throw new Error("Invalid value");
        }
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (skill.type === "clan" && !Clan.fromModel(await ClanModel.findById(character.clan)).line.skills.find(skill => skill.toString() === skillId)) {
            throw new Error("Not allowed skill");
        }
        await CharacterModel.updateOne({_id: characterId, "skills.skill": skillId}, {$set: {"skills.$.level": value}});
    }

    static async setBase(userId: ObjectId, characterId: string, baseId: string, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const character = await CharacterModel.findById(characterId);
        const rankId = character.rank;
        const rank = await RankModel.findById(rankId);
        const maxBase = rank.maxBase;
        if (value > maxBase) {
            throw new Error("Invalid value");
        }
        await CharacterModel.updateOne({_id: characterId, "bases.base": baseId}, {$set: {"bases.$.level": value}});
    }

    static async deleteCharacter(userId: ObjectId, characterId: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await UserModel.findByIdAndUpdate(userId, {$pull: {characters: characterId}});
        await CharacterModel.findByIdAndDelete(characterId);
    }

    static async setNindo(userId: ObjectId, characterId: string, nindo: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindo});
    }

    static async setNindoPoints(userId: ObjectId, characterId: string, nindoPoints: number) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindoPoints});
    }

    static async setSpe(userId: ObjectId, characterId: string, speIndex: number, speId: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if (speIndex >= (await this.calculateMaxChakraSpes(character))) {
            throw new Error("Spe not yet unlocked");
        }
        const spe = ChakraSpe.fromModel(await ChakraSpeModel.findById(speId));
        if (character.chakraSpes.filter(spe => spe.toString() === speId).length > spe.max) {
            throw new Error("Spe already maxed");
        }
        const newChakraSpes = character.chakraSpes;
        newChakraSpes[speIndex] = new mongoose.Types.ObjectId(speId);
        await CharacterModel.findByIdAndUpdate(characterId, {chakraSpes: newChakraSpes});
    }

    private static async calculateMaxChakraSpes(character: Character): Promise<number> {
        const corBaseId = (await BaseModel.findOne({shortName: "COR"}))._id.toString();
        const espBaseId = (await BaseModel.findOne({shortName: "ESP"}))._id.toString();
        const chakraControl = character.bases.filter(base => base.base.toString() === corBaseId || base.base.toString() === espBaseId).reduce((acc, base) => acc + base.level, 0);
        let maxChakraSpes = 1;
        if (chakraControl >= 5) {
            maxChakraSpes += 1;
        }
        if (chakraControl >= 10) {
            maxChakraSpes += 2;
        }
        if (chakraControl >= 14) {
            maxChakraSpes += 2;
        }
        if (chakraControl >= 20) {
            maxChakraSpes += 3;
        }
        if (chakraControl >= 24) {
            maxChakraSpes += 5;
        }
        return maxChakraSpes;
    }

    static async setNotes(userId: ObjectId, characterId: string, text: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {notes: text});
    }

    static async setXp(userId: ObjectId, characterId: string, xp: number) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {xp});
    }

    static async setRank(userId: ObjectId, characterId: string, rank: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (!mongoose.Types.ObjectId.isValid(rank) || !(await RankModel.findById(rank))) {
            throw new Error("Rank not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {rank});
    }

    static async setVillage(userId: ObjectId, characterId: string, village: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (!mongoose.Types.ObjectId.isValid(village) || !(await VillageModel.findById(village))) {
            throw new Error("Village not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {village});
    }

    static async setName(userId: ObjectId, characterId: string, firstName: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {firstName});
    }

    static async setClan(userId: ObjectId, characterId: string, clan: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (!mongoose.Types.ObjectId.isValid(clan) || !(await ClanModel.findById(clan))) {
            throw new Error("Clan not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {clan});
    }

    static async setRoad(userId: ObjectId, characterId: string, road: string) {
        const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
        if (!userCharactersIds.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (road === "") {
            await CharacterModel.findByIdAndUpdate(characterId, {$unset: {road: 1}});
        } else {
            if (!mongoose.Types.ObjectId.isValid(road) || !(await RoadModel.findById(road))) {
                throw new Error("Road not found");
            }
            await CharacterModel.findByIdAndUpdate(characterId, {road});
        }
    }
}