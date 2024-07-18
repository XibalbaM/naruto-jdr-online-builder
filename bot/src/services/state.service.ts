import Character from "../models/character.model.js";
import {Snowflake} from "discord.js";

export default class StateService {

    static userData: Map<string, {isInSenseiMode: boolean, selectedCharacter?: Character}> = new Map();
    static defaultUserData: {isInSenseiMode: boolean} = {isInSenseiMode: false};
    static guildData: Map<Snowflake, {channels: Map<Snowflake, {initiatives: Map<string, number>}>}> = new Map();

    static setInSenseiMode(userId: string, isInSenseiMode: boolean) {
        this.userData.set(userId, {
            ...this.defaultUserData,
            ...this.userData.get(userId),
            isInSenseiMode
        });
    }

    static isInSenseiMode(userId: string) {
        return this.userData.get(userId)?.isInSenseiMode ?? false;
    }

    static setSelectedCharacter(userId: string, character: Character | undefined) {
        this.userData.set(userId, {
            ...this.defaultUserData,
            ...this.userData.get(userId),
            selectedCharacter: character
        });
    }

    static getSelectedCharacter(userId: string) {
        return this.userData.get(userId)?.selectedCharacter;
    }

    static setInitiative(guildId: Snowflake, channelId: Snowflake, characterName: string, initiative: number) {
        if (!this.guildData.has(guildId)) {
            this.guildData.set(guildId, {channels: new Map()});
        }
        if (!this.guildData.get(guildId)!.channels.has(channelId)) {
            this.guildData.get(guildId)!.channels.set(channelId, {initiatives: new Map()});
        }
        this.guildData.get(guildId)!.channels.get(channelId)!.initiatives.set(characterName, initiative);
    }

    static getInitiatives(guildId: Snowflake, channelId: Snowflake): Map<string, number> {
        return this.guildData.get(guildId)?.channels.get(channelId)?.initiatives ?? new Map();
    }

    static clearInitiatives(guildId: Snowflake, channelId: Snowflake) {
        this.guildData.get(guildId)!.channels.get(channelId)!.initiatives.clear();
    }
}