import {Skill} from "./skill.model.js";
import DataService from "../services/data.service.js";

/**
 * Class representing a character
 * @class Character
 */
export default class Character {
    _id!: string;
    firstName!: string;
    clan!: string;
    village!: string;
    road?: string;
    xp!: number;
    rank!: string;
    bases: number[] = [];
    commonSkills: number[] = [];
    customSkills: {skill: string, level: number}[] = [];
    nindo!: string;
    nindoPoints!: number;
    chakraSpes: string[] = [];
    notes!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(character?: Character) {
        if (character) Object.assign(this, character);
    }

    getAllSkills(): { skill: Skill, level: number }[] {
        let commonSkills = DataService.commonSkills.map((skill, index) => ({skill, level: this.commonSkills[index]}));
        let customSkills = this.customSkills.map(skillData => ({skill: DataService.customSkills.find(skill => skill._id === skillData.skill)!, level: skillData.level}));
        return [...commonSkills, ...customSkills];
    }
}

export type CharacterInfo = {_id: string, name: string, xp: number};