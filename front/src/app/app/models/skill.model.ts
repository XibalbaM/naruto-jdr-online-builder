import Base from "./base.model";

/**
 * Class representing a skill.
 * @class Skill
 */
export default class Skill {
  _id!: string;
  name!: string;
  base!: Base | string;
  description!: string;
  type!: "common" | "combat" | "terrain" | "clan";
}
