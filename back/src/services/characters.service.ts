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
import {CommonSkillModel, CustomSkillModel} from "../models/skill.model.js";

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

    static async canUserReadCharacter(user: User, character: Character) {
        return user.isAdmin || character.shareStatus !== "private" || user.characters.includes(character._id)
    }

    static async listCharacters(user: User) {
        const characters: Character[] = [];
        for (let character of user.characters) {
            characters.push(Character.fromModel(await CharacterModel.findById(character).lean()));
        }
        return characters;
    }

    static async summaryCharacters(user: User) {
        const characters: {_id: mongoose.Types.ObjectId, name: string, xp: number}[] = [];
        for (let character of user.characters) {
            let data = Character.fromModel(await CharacterModel.findById(character).select(["_id", "firstName", "clan", "xp"]).lean());
            let clanName = (await ClanModel.findById(data.clan).select("name").lean()).name;
            characters.push({_id: data._id, name: data.firstName + " " + clanName, xp: data.xp});
        }
        return characters;
    }

    static async createCharacter(userId: ObjectId, body: { character: Omit<Character, "_id" | "bases" | "skills" | "chakraSpes" | "nindoPoints"> }) {
        const character = Character.fromModel(await CharacterModel.create(body.character));
        await UserModel.findByIdAndUpdate(userId, {$push: {characters: character._id}});
        return character;
    }

    static async getCharacter(user: User, characterId: string) {
        const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
        if (!await this.canUserReadCharacter(user, character)) {
            throw new Error("Character not found");
        }
        return character;
    }

    static async copyCharacter(user: User, characterId: string) {
        const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
        if (!await this.canUserReadCharacter(user, character)) {
            throw new Error("Character not found");
        }
        delete character._id;
        character.shareStatus = "private";
        character.firstName = "(Copie) " + character.firstName;
        const newCharacter = Character.fromModel(await CharacterModel.create(character));
        await UserModel.findByIdAndUpdate(user._id, {$push: {characters: newCharacter._id}});
        return newCharacter;
    }

    static async setCommonSkill(user: User, characterId: string, skillId: string, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        const skill = Skill.fromModel(await CommonSkillModel.findById(skillId).lean());
        const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
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
            const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
            if ((await ClanModel.findById(character.clan).lean().select("line")).line.skills.find(skill => skill.toString() === skillId)) {
                throw new Error("Cannot remove clan skill");
            }
            await CharacterModel.updateOne({_id: characterId}, {$pull: {customSkills: {skill: skillId}}}, {multi: true});
        } else {
            const skill = CustomSkill.fromModel(await CustomSkillModel.findById(skillId).lean());
            const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
            if (value > (character.customSkills.find(skill => skill.skill.toString() === skillId)?.level ?? 0) && value > character.bases.find((_, index) => index === skill.base) + 2) {
                throw new Error("Invalid value");
            }
            if (skill.type === "clan" && !(await ClanModel.findById(character.clan).lean().select("line")).line.skills.find(skill => skill.toString() === skillId)) {
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
        const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
        const rankId = character.rank;
        const maxBase = (await RankModel.findById(rankId).lean().select("maxBase")).maxBase;
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
        const character = Character.fromModel(await CharacterModel.findById(characterId).lean());
        if (speIndex >= (await this.calculateMaxChakraSpes(character))) {
            throw new Error("Spe not yet unlocked");
        }
        const spe = ChakraSpe.fromModel(await ChakraSpeModel.findById(speId).lean());
        if (character.chakraSpes.filter(spe => spe !== null && spe.toString() === speId).length >= spe.max) {
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
        let character = Character.fromModel(await CharacterModel.findById(characterId).lean());
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
        const line = (await ClanModel.findById(clan).lean().select("line")).line;
        if (line.skills.length > 0) {
            await CharacterModel.findByIdAndUpdate(characterId, {clan, customSkills: line.skills.map(skill => ({skill, level: 1}))});
        } else {
            await CharacterModel.findByIdAndUpdate(characterId, {clan, $pull: {customSkills: {}}});
        }
    }

    static async setRoad(user: User, characterId: string, road: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        if (road === "") {
            const clanId = (await CharacterModel.findByIdAndUpdate(characterId, {$unset: {road: 1}, $pull: {customSkills: {}}}).lean().select("clan")).clan;
            const line = (await ClanModel.findById(clanId).lean().select("line")).line;
            if (line.skills.length > 0) {
                await CharacterModel.findByIdAndUpdate(characterId, {customSkills: line.skills.map(skill => ({skill, level: 1}))});
            }
        } else {
            if (!mongoose.Types.ObjectId.isValid(road) || !(await RoadModel.exists({_id: road}))) {
                throw new Error("Road not found");
            }
            await CharacterModel.findByIdAndUpdate(characterId, {road, $pull: {customSkills: {}}});
        }
    }

    static async setShareStatus(user: User, characterId: string, status: "private" | "not-referenced" | "public" | "predrawn") {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {shareStatus: status});
    }

    static async deleteCharacter(user: User, characterId: string) {
        if (!user.characters.includes(characterId as any)) {
            throw new Error("Character not found");
        }
        await UserModel.findByIdAndUpdate(user._id, {$pull: {characters: characterId}});
        await CharacterModel.findByIdAndDelete(characterId);
    }
}