import Character from "../models/character.model.js";
import {Snowflake} from "discord.js";

type UserData = {
    isInSenseiMode: boolean,
    selectedCharacter?: Character
}
type GuildData = {
    channels: Map<Snowflake, ChannelData>
}
type ChannelData = {
    initiatives: Map<string, number>
    users: Map<Snowflake, ChannelUserData>
}
type ChannelUserData = {
    pnjs: {
        name: string,
        initiative: number
    }[]
}

export default class StateService {

    static userData: Map<string, UserData> = new Map();
    static defaultUserData: UserData = {isInSenseiMode: false};
    static guildData: Map<Snowflake, GuildData> = new Map();
    static defaultGuildData: GuildData = {channels: new Map()};
    static defaultChannelData: ChannelData = {initiatives: new Map(), users: new Map()};
    static defaultChannelUserData: ChannelUserData = {pnjs: []};

    private static initUserIfNeeded(userId: string) {
        if (!this.userData.has(userId))
            this.userData.set(userId, structuredClone(this.defaultUserData));
    }
    private static initGuildIfNeeded(guildId: Snowflake) {
        if (!this.guildData.has(guildId))
            this.guildData.set(guildId, structuredClone(this.defaultGuildData));
    }
    private static initChannelIfNeeded(guildId: Snowflake, channelId: Snowflake) {
        this.initGuildIfNeeded(guildId);
        console.log(this.guildData.get(guildId));
        if (!this.guildData.get(guildId)!.channels.has(channelId))
            this.guildData.get(guildId)!.channels.set(channelId, structuredClone(this.defaultChannelData));
    }
    private static initChannelUserIfNeeded(guildId: Snowflake, channelId: Snowflake, userId: Snowflake) {
        this.initChannelIfNeeded(guildId, channelId);
        if (!this.guildData.get(guildId)!.channels.get(channelId)!.users.has(userId))
            this.guildData.get(guildId)!.channels.get(channelId)!.users.set(userId, structuredClone(this.defaultChannelUserData));
    }

    static setInSenseiMode(userId: string, isInSenseiMode: boolean) {
        this.initUserIfNeeded(userId);
        this.userData.get(userId)!.isInSenseiMode = isInSenseiMode;
    }

    static isInSenseiMode(userId: string) {
        return this.userData.get(userId)?.isInSenseiMode ?? false;
    }

    static setSelectedCharacter(userId: string, character: Character | undefined) {
        this.initUserIfNeeded(userId);
        this.userData.get(userId)!.selectedCharacter = character;
    }

    static getSelectedCharacter(userId: string) {
        return this.userData.get(userId)?.selectedCharacter;
    }

    static setInitiative(guildId: Snowflake, channelId: Snowflake, characterName: string, initiative: number) {
        this.initChannelIfNeeded(guildId, channelId);
        this.guildData.get(guildId)!.channels.get(channelId)!.initiatives.set(characterName, initiative);
    }

    static getInitiatives(guildId: Snowflake, channelId: Snowflake): Map<string, number> {
        return this.guildData.get(guildId)?.channels.get(channelId)?.initiatives ?? new Map();
    }

    static clearInitiatives(guildId: Snowflake, channelId: Snowflake) {
        this.initChannelIfNeeded(guildId, channelId);
        this.guildData.get(guildId)!.channels.get(channelId)!.initiatives.clear();
    }

    static addPNJ(guildId: Snowflake, channelId: Snowflake, userId: Snowflake, name: string, initiative: number) {
        console.log(guildId, channelId, userId, name, initiative);
        console.log(this.guildData.get(guildId)?.channels.get(channelId)?.users);
        this.initChannelUserIfNeeded(guildId, channelId, userId);
        this.guildData.get(guildId)!.channels.get(channelId)!.users.get(userId)!.pnjs.push({name, initiative});
        console.log(this.guildData.get(guildId)?.channels.get(channelId)?.users);
    }

    static removePNJ(guildId: Snowflake, channelId: Snowflake, userId: Snowflake, name: string) {
        this.initChannelUserIfNeeded(guildId, channelId, userId);
        let userChannelData = this.guildData.get(guildId)!.channels.get(channelId)!.users.get(userId)!;
        userChannelData.pnjs = userChannelData.pnjs.filter(pnj => pnj.name !== name);
    }

    static clearPNJs(guildId: Snowflake, channelId: Snowflake, userId: Snowflake) {
        this.initChannelUserIfNeeded(guildId, channelId, userId);
        this.guildData.get(guildId)!.channels.get(channelId)!.users.get(userId)!.pnjs = [];
    }

    static getPNJs(guildId: Snowflake, channelId: Snowflake, userId: Snowflake) {
        return this.guildData.get(guildId)?.channels.get(channelId)?.users.get(userId)?.pnjs ?? [];
    }
}