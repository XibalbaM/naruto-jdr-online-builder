import Group from "./group.model";
import Character from "./character.model";

/**
 * Class representing a user.
 * @class User
 */
export default class User {
    _id!: string;
    email!: string;
    username?: string;
    profileImage?: string;
    isAdmin!: boolean;
    groups!: { role: "sensei" | "player", group: Group }[];
    characters!: Character[]
    discordId?: string;
    discordUsername?: string;
    createdAt!: Date;
    lastActivity!: Date;

    constructor(user: User) {
        Object.assign(this, user);
        this.createdAt = new Date(this.createdAt);
        this.lastActivity = new Date(this.lastActivity);
    }
}
