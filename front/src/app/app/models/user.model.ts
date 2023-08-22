import Group from "./group.model";
import Character from "./character.model";

/**
 * Class representing a user.
 * @class User
 */
export default class User {
  _id!: number;
  email!: string;
  username?: string;
  profileImage?: string;
  isAdmin!: boolean;
  groups!: {role: "sensei" | "player", group: Group}[];
  characters!: Character[]
  discordId?: string;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
