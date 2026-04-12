import apiUtils from "../utils/api.utils.js";
import {Snowflake} from "discord.js";
import Character, {CharacterInfo} from "../models/character.model.js";
import {maxChakra} from "naruto-jdr-online-builder-common/src/utils/character.utils.js";
import DataService from "./data.service";

export default class CharacterService {

    static async getCharacter(id: string, userId: Snowflake): Promise<Character> {
        const response = await apiUtils.get<Character>("/characters/" + id, userId);
        return response.data;
    }

    static async getCharacters(userId: Snowflake): Promise<CharacterInfo[]> {
        const response = await apiUtils.get<CharacterInfo[]>("/characters", userId);
        return response.data;
    }

    static Chakra = {
        async restore(id: string, character: Character) {
            let max = maxChakra(character, DataService.clans, DataService.spes)
            if (character.activeChakraAmount < max) {
                if ((await apiUtils.post("/characters/" + character._id + "/activeChakraAmount", {amount: max}, id)).status !== 200)
                    throw new Error("Failed to restore chakra");
                else character.activeChakraAmount = max;
            }
        },

        async spend(id: string, character: Character, quantityToSpend: number) {
            if ((await apiUtils.post("/characters/" + character._id + "/activeChakraAmount", {amount: character.activeChakraAmount - quantityToSpend}, id)).status !== 200)
                throw new Error("Failed to spend chakra");
            else character.activeChakraAmount -= quantityToSpend;
        },

        async gain(id: string, character: Character, quantityToGain: number) {
            if ((await apiUtils.post("/characters/" + character._id + "/activeChakraAmount", {amount: character.activeChakraAmount + quantityToGain}, id)).status !== 200)
                throw new Error("Failed to gain chakra");
            else character.activeChakraAmount += quantityToGain;
        }
    }

    static Nindo = {
        async spend(id: string, character: Character, quantityToSpend: number) {
            if ((await apiUtils.post("/characters/" + character._id + "/nindoPoints", {points: character.nindoPoints - quantityToSpend}, id)).status !== 200)
                throw new Error("Failed to spend nindo points");
            else character.nindoPoints -= quantityToSpend;
        },

        async gainCharges(id: string, character: Character) {
            if ((await apiUtils.post("/characters/" + character._id + "/nindoCharges", {charges: 5}, id)).status !== 200)
                throw new Error("Failed to gain nindo charges");
            else character.nindoCharges = 5;
        },

        async useCharges(id: string, character: Character, quantityToUse: number) {
            if ((await apiUtils.post("/characters/" + character._id + "/nindoCharges", {charges: character.nindoCharges - quantityToUse}, id)).status !== 200)
                throw new Error("Failed to spend nindo charges");
            else character.nindoCharges -= quantityToUse;
        },
    }
}