import Village from "./village.model";

/**
 * Class representing a clan.
 * @class Clan
 */
export default class Clan {
  _id!: string;
  name!: string;
  village!: Village | number;
  description!: string;
}
