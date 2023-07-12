import Character from "../classes/character.class.js";
import {ObjectId} from "mongoose";
import User from "../classes/user.class.js";
import CharacterModel from "../models/character.model.js";
import UserModel from "../models/user.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import ChakraSpe from "../classes/chakraSpe.class.js";
import SkillModel from "../models/skill.model.js";
import Skill from "../classes/skill.class.js";

export default class CharactersService {

	static async listCharacters(user: User) {
		const characters: Character[] = [];
		for (let character of user.characters) {
			characters.push(Character.fromModel(await CharacterModel.findById(character)));
		}
		return characters;
	}

	static async createCharacter(userId: ObjectId, body: {character: Omit<Character, "_id" | "bases" | "skills" | "chakraSpes" | "nindoPoints">}) {
		const character = Character.fromModel(await CharacterModel.create(body.character));
		await UserModel.findByIdAndUpdate(userId, {$push: {characters: character._id}});
		return character;
	}

	static async getCharacter(userId: ObjectId, characterId: string) {
		const character = Character.fromModel(await CharacterModel.findById(characterId));
		const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
		if (!userCharactersIds.includes(characterId as any)) {
			throw new Error("Character not found");
		}
		return character;
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

	static async changeSpe(userId: ObjectId, characterId: string, speId: string, action: "add" | "remove") {
		const userCharactersIds = User.fromModel(await UserModel.findById(userId)).characters;
		if (!userCharactersIds.includes(characterId as any)) {
			throw new Error("Character not found");
		}
		const character = Character.fromModel(await CharacterModel.findById(characterId));
		const spe = ChakraSpe.fromModel(await ChakraSpeModel.findById(speId));
		if (action === "add" && character.chakraSpes.find(spe => spe.spe.toString() === speId).level === spe.max) {
			throw new Error("Spe already maxed");
		} else if (action === "remove" && character.chakraSpes.find(spe => spe.spe.toString() === speId).level === 0) {
			throw new Error("Spe already at 0");
		}
		await CharacterModel.updateOne({_id: characterId, "chakraSpes.spe": speId}, {$inc: {"chakraSpes.$.level": action === "add" ? 1 : -1}});
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
}