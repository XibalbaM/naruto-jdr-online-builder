/**
 * Class representing a skill.
 * @class Skill
 */
export default class Skill {
    _id!: string;
    name!: string;
    base!: string;
    description!: string;
    type!: "common" | "combat" | "terrain" | "clan";
}
