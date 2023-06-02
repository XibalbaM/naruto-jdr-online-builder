import mongoose from "mongoose";

/**
 * Describes a skill, in a more convenient and lightweight way than the model
 * @Class Skill
 */
export default class Skill {
    _id: mongoose.Types.ObjectId;
    name: string;
    base: mongoose.Types.ObjectId;
    description: string;
    isCommon: boolean;
    isClan: boolean;

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
        skill.isCommon = modelSkill.isCommon;
        skill.isClan = modelSkill.isClan;

        return skill;
    }
}