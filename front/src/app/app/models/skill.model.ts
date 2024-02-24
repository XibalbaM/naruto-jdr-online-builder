/**
 * Class representing a skill.
 * @class Skill
 */
export class Skill {
    _id!: string;
    name!: string;
    base!: number;
    description!: string;
}

export class CustomSkill extends Skill {
    type!: "combat" | "terrain" | "clan";
}