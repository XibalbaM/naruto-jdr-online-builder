import _Character from "./character.interface.js";

export default interface _User {
    _id: any;
    email: string;
    username?: string;
    isAdmin: boolean;
    groups: string[];
    characters: (string | _Character)[];
    discordId?: string;
    createdAt: any;
    lastActivity: any;
    discordName?: string;
    profileImage?: string;
}