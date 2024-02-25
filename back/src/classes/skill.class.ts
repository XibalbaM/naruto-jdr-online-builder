import mongoose from "mongoose";

/**
 * Describes a skill, in a more convenient and lightweight way than the model
 * @Class Skill
 */
export default class Skill {
    _id: mongoose.Types.ObjectId;
    name: string;
    base: number;
    description: string;

    /**
     * Creates a new skill from a model
     * @param modelSkill The model to create the skill from
     */
    static fromModel(modelSkill): Skill {

        const skill = new Skill();
        skill._id = modelSkill._id;
        skill.name = modelSkill.name;
        skill.base = modelSkill.base;
        skill.description = modelSkill.description;

        return skill;
    }
}

export class CustomSkill extends Skill {

    type: "combat" | "terrain" | "clan";

    static override fromModel(modelSkill): CustomSkill {

        const skill = super.fromModel(modelSkill) as CustomSkill;
        skill.type = modelSkill.type;

        return skill;
    }
}