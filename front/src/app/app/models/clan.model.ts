import Line from "./line.model";

/**
 * Class representing a clan.
 * @class Clan
 */
export default class Clan {
    _id!: string;
    name!: string;
    village!: string;
    description!: string;
    line!: Line;
}
