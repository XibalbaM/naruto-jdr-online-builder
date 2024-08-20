import apiUtils from "../utils/api.utils.js";
import {Snowflake} from "discord.js";
import Character, {CharacterInfo} from "../models/character.model.js";

export default class CharacterService {

    static async getCharacter(id: string, userId: Snowflake): Promise<Character> {
        const response = await apiUtils.get<Character>("/characters/" + id, userId);
        return response.data;
    }

    static async getCharacters(userId: Snowflake): Promise<CharacterInfo[]> {
        const response = await apiUtils.get<CharacterInfo[]>("/characters", userId);
        return response.data;
    }
}