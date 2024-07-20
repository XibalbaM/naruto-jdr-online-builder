import _User from 'common/src/interfaces/user.interface';
import Character from "./character.interface";

export default interface User extends _User {
    _id: string;
    characters: Character[];
}
