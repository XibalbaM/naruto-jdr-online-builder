import {Skill} from "./skill.model.js";
import DataService from "../services/data.service.js";
import _Character from "naruto-jdr-online-builder-common/src/interfaces/character.interface";

export default interface Character extends _Character {
    _id: string;
}

export type CharacterInfo = {_id: string, name: string, xp: number};

export function getAllSkills(character: Character): { skill: Skill, level: number }[] {
    let commonSkills = DataService.commonSkills.map((skill, index) => ({skill, level: character.commonSkills[index]}));
    let customSkills = character.customSkills.map(skillData => ({skill: DataService.customSkills.find(skill => skill._id === skillData.skill)!, level: skillData.level}));
    return [...commonSkills, ...customSkills];
}