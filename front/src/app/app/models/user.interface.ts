import Character from "./character.interface";
import _User from "naruto-jdr-online-builder-common/src/interfaces/user.interface";

export default interface User extends _User {
    _id: string;
    characters: Character[];
    createdAt: string;
    lastActivity: string;
}
