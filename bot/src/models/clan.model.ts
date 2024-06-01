import Line from "./line.model.js";

/**
 * Class representing a clan.
 * @class Clan
 */
export default class Clan {
    _id!: string;
    name!: string;
    line!: Line;
}
