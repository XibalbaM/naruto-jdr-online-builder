import Character from "../interfaces/character.interface.js";
import mongoose from "mongoose";
import User from "../interfaces/user.interface.js";
import CharacterModel from "../models/character.model.js";
import UserModel from "../models/user.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import ClanModel from "../models/clan.model.js";
import RoadModel from "../models/road.model.js";
import RankModel from "../models/rank.model.js";
import {CommonSkillModel, CustomSkillModel} from "../models/skill.model.js";
import Line from "naruto-jdr-online-builder-common/src/interfaces/line.interface";
import {canUserEditCharacter, canUserReadCharacter, maxChakraSpes} from "naruto-jdr-online-builder-common/src/utils/character.utils.js";

export default class CharactersService {

    static async listCharacters(user: User) {
        const characters: Character[] = [];
        for (let character of user.characters) {
            characters.push((await CharacterModel.findById(character).lean())!);
        }
        return characters;
    }

    static async summaryCharacters(user: User) {
        const characters: {_id: string, name: string, xp: number}[] = [];
        for (let character of user.characters) {
            let data = (await CharacterModel.findById(character).select(["_id", "firstName", "clan", "xp"]).lean())!;
            let clanName = (await ClanModel.findById(data.clan.id).select("name").lean())!.name;
            characters.push({_id: data._id.toString(), name: data.firstName + " " + clanName, xp: data.xp});
        }
        return characters;
    }

    static async createCharacter(user: User, body: { character: Omit<Character, "_id" | "bases" | "skills" | "chakraSpes" | "nindoPoints"> }): Promise<Character> {
        const character = (await CharacterModel.create(body.character))!;
        await UserModel.findByIdAndUpdate(user._id, {$push: {characters: character._id}});
        return character;
    }

    static async getCharacter(user: User, characterId: string): Promise<Character> {
        const character = (await CharacterModel.findById(characterId).lean())!;
        if (!canUserReadCharacter(user, character)) {
            throw new Error("Character not found");
        }
        return character;
    }

    static async copyCharacter(user: User, characterId: string): Promise<Character> {
        const character = (await CharacterModel.findById(characterId).lean())!;
        if (!canUserReadCharacter(user, character)) {
            throw new Error("Character not found");
        }
        let data = character as Partial<Character>;
        delete data._id;
        data.shareStatus = "private";
        data.firstName = "(Copie) " + data.firstName;
        const newCharacter = (await CharacterModel.create(data));
        await UserModel.findByIdAndUpdate(user._id, {$push: {characters: newCharacter._id}});
        return newCharacter;
    }

    static async setCommonSkill(user: User, characterId: string, skillId: number, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        const skill = (await CommonSkillModel.findById(skillId).lean())!;
        const character = (await CharacterModel.findById(characterId).lean())!;
        if (value > character.commonSkills[skillId] && value > character.bases.find((_, index) => index === skill.base)! + 2) {
            throw new Error("Invalid value");
        }
        let data: {
            [key: `commonSkills.${number}`]: number;
        } = {};
        data[`commonSkills.${skillId}`] = value;
        await CharacterModel.findByIdAndUpdate(characterId, {$set: data});
    }

    static async setCustomSkill(user: User, characterId: string, skillId: string, value: number) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        if (value < 1) {
            const character = (await CharacterModel.findById(characterId).lean())!;
            if (character.clan.id !== "custom" && ((await ClanModel.findById(character.clan.id).lean().select("line"))!.line as Line).skills.find(skill => skill.toString() === skillId)) {
                throw new Error("Cannot remove clan skill");
            }
            await CharacterModel.updateOne({_id: characterId}, {$pull: {customSkills: {skill: skillId}}}, {multi: true});
        } else {
            const skill = (await CustomSkillModel.findById(skillId).lean())!;
            const character = (await CharacterModel.findById(characterId).lean())!;
            if (value > (character.customSkills.find(skill => skill.skill.toString() === skillId)?.level ?? 0) && value > character.bases.find((_, index) => index === skill.base)! + 2) {
                throw new Error("Invalid value");
            }
            if (skill.type === "clan" && !((await ClanModel.findById(character.clan.id).lean().select("line"))!.line as Line).skills.find(skill => skill.toString() === skillId)) {
                throw new Error("Not allowed skill");
            }
            if (character.customSkills.find(skill => skill.skill.toString() === skillId)) {
                await CharacterModel.updateOne({_id: characterId, "customSkills.skill": skillId}, {$set: {"customSkills.$.level": value}});
            } else {
                await CharacterModel.updateOne({_id: characterId}, {$push: {customSkills: {skill: skillId, level: value}}});
            }
        }
    }

    static async setBase(user: User, characterId: string, baseId: number, value: number) {
        if (value < 1) {
            throw new Error("Invalid value");
        }
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        const character = (await CharacterModel.findById(characterId).lean())!;
        const rankId = character.rank;
        const maxBase = (await RankModel.findById(rankId).lean().select("maxBase"))!.maxBase;
        if (value > character.bases[baseId] && value > maxBase) {
            throw new Error("Invalid value");
        }
        let data: {
            [key: `bases.${number}`]: number;
        } = {};
        data[`bases.${baseId}`] = value;
        await CharacterModel.findByIdAndUpdate(characterId, {$set: data});
    }

    static async setNindo(user: User, characterId: string, nindo: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindo});
    }

    static async setNindoPoints(user: User, characterId: string, nindoPoints: number) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {nindoPoints});
    }

    static async addSpe(user: User, characterId: string, speIndex: number, speId: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        const character = (await CharacterModel.findById(characterId).lean())!;
        if (speIndex >= (maxChakraSpes(character))) {
            throw new Error("Spe not yet unlocked");
        }
        const spe = (await ChakraSpeModel.findById(speId).lean())!;
        if (character.chakraSpes.filter(spe => spe !== null && spe.toString() === speId).length >= spe.max) {
            throw new Error("Spe already maxed");
        }
        const newChakraSpes = character.chakraSpes as string[];
        newChakraSpes[speIndex] = speId;
        await CharacterModel.findByIdAndUpdate(characterId, {chakraSpes: newChakraSpes});
    }

    static async removeSpe(user: User, characterId: string, speIndex: number) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        let character = (await CharacterModel.findById(characterId).lean())!;
        if (character.chakraSpes.length <= speIndex) {
            throw new Error("Spe not set");
        }
        let data: {
            [key: `chakraSpes.${number}`]: number;
        } = {};
        data[`chakraSpes.${speIndex}`] = 1;
        await CharacterModel.findByIdAndUpdate(characterId, {$unset: data})
        await CharacterModel.findByIdAndUpdate(characterId, {$pull: {chakraSpes: null}});
    }

    static async setNotes(user: User, characterId: string, text: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {notes: text});
    }

    static async setXp(user: User, characterId: string, xp: number) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {xp});
    }

    static async setRank(user: User, characterId: string, rank: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {rank});
    }

    static async setVillage(user: User, characterId: string, village: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {village});
    }

    static async setName(user: User, characterId: string, firstName: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {firstName});
    }

    static async setClan(user: User, characterId: string, clan: {id: string, name?: string}) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        const line = clan.id !== "custom" ? (await ClanModel.findById(clan.id).lean().select("line"))!.line as Line : {skills: []};
        if (line.skills.length > 0) {
            await CharacterModel.findByIdAndUpdate(characterId, {clan, customSkills: line.skills.map(skill => ({skill, level: 1}))});
        } else {
            await CharacterModel.findByIdAndUpdate(characterId, {clan, $pull: {customSkills: {}}});
        }
    }

    static async setRoad(user: User, characterId: string, road: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        if (road === "") {
            const clan = (await CharacterModel.findByIdAndUpdate(characterId, {$unset: {road: 1}, $pull: {customSkills: {}}}).lean().select("clan"))!.clan;
            const line = (await ClanModel.findById(clan.id).lean().select("line"))!.line as Line;
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
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await CharacterModel.findByIdAndUpdate(characterId, {shareStatus: status});
    }

    static async deleteCharacter(user: User, characterId: string) {
        if (!canUserEditCharacter(user, characterId)) {
            throw new Error("Character not found");
        }
        await UserModel.findByIdAndUpdate(user._id, {$pull: {characters: characterId}});
        await CharacterModel.findByIdAndDelete(characterId);
    }

    static async getPublicCharacters() {
        let characters = (await CharacterModel.find({shareStatus: "public"}).lean()) as Character[];
        return Promise.all(characters.map(async (character) => {
            let ownerName = (await UserModel.findOne({characters: character._id}).lean().select("username"))!.username || "Ninja sans nom";
            return {character, ownerName};
        }));
    }
}