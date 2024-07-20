import _Character from "./character.interface";

export default interface _User {
    _id: any;
    email: string;
    username?: string;
    isAdmin: boolean;
    groups: string[];
    characters: (string | _Character)[];
    discordId?: string;
    createdAt: Date;
    lastActivity: Date;
    discordName?: string;
    profileImage?: string;
}