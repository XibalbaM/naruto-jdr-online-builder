import Village from "./village.model";
import Base from "./base.model";
import Clan from "./clan.model";
import Road from "./road.model";
import Skill from "./skill.model";
import Rank from "./rank.model";

/**
 * Class representing a character
 * @class Character
 */
export default class Character {
  _id!: string;
  firstName!: string;
  clan!: Clan | number;
  village!: Village | number;
  road?: Road | number;
  level!: string;
  rank!: Rank;
  xp!: number;
  nindo!: string;
  nindoPoints!: number;
  story!: string;
  bases!: Map<Base | number, number>;
  skills!: Map<Skill | number, number>;
}
