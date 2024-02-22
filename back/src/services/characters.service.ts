import Character from "../classes/character.class.js";
import mongoose, {ObjectId} from "mongoose";
import User from "../classes/user.class.js";
import CharacterModel from "../models/character.model.js";
import UserModel from "../models/user.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import ChakraSpe from "../classes/chakraSpe.class.js";
import Skill, {CustomSkill} from "../classes/skill.class.js";
import ClanModel from "../models/clan.model.js";
import RoadModel from "../models/road.model.js";
import RankModel from "../models/rank.model.js";
import Clan from "../classes/clan.class.js";
import {CommonSkillModel, CustomSkillModel} from "../models/skill.model";

export default class CharactersService {

    private static async calculateMaxChakraSpes(character: Character): Promise<number> {
        const corBaseId = 0;
        const espBaseId = 1;
        const chakraControl = character.bases.filter((_, index) => index === corBaseId || index === espBaseId).reduce((acc, base) => acc + base, 0);
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

    static async canUserReadCharacter(userId: ObjectId, character: Character) {
        if (character.isPredrawn) return true;
        const userCharactersIds = (await UserModel.findById(userId).select("characters")).characters as [mongoose.Types.ObjectId];
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

    static async setCommonSkill(user: User, characterId: string, skillId: string, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const skill = Skill.fromModel(await CommonSkillModel.findById(skillId));
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if (value > character.commonSkills[skillId] && value > character.bases.find((_, index) => index === skill.base) + 2) {
            throw new Error("Invalid value");
        }
        let data = {};
        data[`commonSkills.${skillId}`] = value;
        await CharacterModel.findByIdAndUpdate(characterId, {$set: data});
    }

    static async setCustomSkill(user: User, characterId: string, skillId: string, value: number) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (value < 1) {
            const character = Character.fromModel(await CharacterModel.findById(characterId));
            if (Clan.fromModel(await ClanModel.findById(character.clan)).line.skills.find(skill => skill.toString() === skillId)) {
                throw new Error("Cannot remove clan skill");
            }
            await CharacterModel.updateOne({_id: characterId}, {$pull: {customSkills: {skill: skillId}}}, {multi: true});
        } else {
            const skill = CustomSkill.fromModel(await CustomSkillModel.findById(skillId));
            const character = Character.fromModel(await CharacterModel.findById(characterId));
            if (value > (character.customSkills.find(skill => skill.skill.toString() === skillId)?.level ?? 0) && value > character.bases.find((_, index) => index === skill.base) + 2) {
                throw new Error("Invalid value");
            }
            if (skill.type === "clan" && !Clan.fromModel(await ClanModel.findById(character.clan)).line.skills.find(skill => skill.toString() === skillId)) {
                throw new Error("Not allowed skill");
            }
            if (character.customSkills.find(skill => skill.skill.toString() === skillId)) {
                await CharacterModel.updateOne({_id: characterId, "customSkills.skill": skillId}, {$set: {"customSkills.$.level": value}});
            } else {
                await CharacterModel.updateOne({_id: characterId}, {$push: {customSkills: {skill: skillId, level: value}}});
            }
        }
    }

    static async setBase(user: User, characterId: string, baseId: string, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        const rankId = character.rank;
        const rank = await RankModel.findById(rankId);
        const maxBase = rank.maxBase;
        if (value > character.bases[baseId] && value > maxBase) {
            throw new Error("Invalid value");
        }
        let data = {};
        data[`bases.${baseId}`] = value;
        await CharacterModel.findByIdAndUpdate(characterId, {$set: data});
    }

    static async setNindo(user: User, characterId: string, nindo: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindo});
    }

    static async setNindoPoints(user: User, characterId: string, nindoPoints: number) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindoPoints});
    }

    static async addSpe(user: User, characterId: string, speIndex: number, speId: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const character = Character.fromModel(await CharacterModel.findById(characterId));
        if (speIndex >= (await this.calculateMaxChakraSpes(character))) {
            throw new Error("Spe not yet unlocked");
        }
        const spe = ChakraSpe.fromModel(await ChakraSpeModel.findById(speId));
        if (character.chakraSpes.filter(spe => spe.toString() === speId).length >= spe.max) {
            throw new Error("Spe already maxed");
        }
        const newChakraSpes = character.chakraSpes;
        newChakraSpes[speIndex] = new mongoose.Types.ObjectId(speId);
        await CharacterModel.findByIdAndUpdate(characterId, {chakraSpes: newChakraSpes});
    }

    static async removeSpe(user: User, characterId: string, speIndex: number) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        let character = Character.fromModel(await CharacterModel.findById(characterId));
        if (character.chakraSpes.length <= speIndex) {
            throw new Error("Spe not set");
        }
        let data = {};
        data[`chakraSpes.${speIndex}`] = 1;
        await CharacterModel.findByIdAndUpdate(characterId, {$unset: data})
        await CharacterModel.findByIdAndUpdate(characterId, {$pull: {chakraSpes: null}});
    }

    static async setNotes(user: User, characterId: string, text: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {notes: text});
    }

    static async setXp(user: User, characterId: string, xp: number) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {xp});
    }

    static async setRank(user: User, characterId: string, rank: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {rank});
    }

    static async setVillage(user: User, characterId: string, village: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {village});
    }

    static async setName(user: User, characterId: string, firstName: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {firstName});
    }

    static async setClan(user: User, characterId: string, clan: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {clan, $pull: {customSkills: {}}});
    }

    static async setRoad(user: User, characterId: string, road: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (road === "") {
            await CharacterModel.findByIdAndUpdate(characterId, {$unset: {road: 1}, $pull: {customSkills: {}}});
        } else {
            if (!mongoose.Types.ObjectId.isValid(road) || !(await RoadModel.findById(road))) {
                throw new Error("Road not found");
            }
            await CharacterModel.findByIdAndUpdate(characterId, {road, $pull: {customSkills: {}}});
        }
    }

    static async deleteCharacter(user: User, characterId: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await UserModel.findByIdAndUpdate(user._id, {$pull: {characters: characterId}});
        await CharacterModel.findByIdAndDelete(characterId);
    }
}