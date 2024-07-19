import {ObjectId} from "mongoose";

export default interface Skill {
    _id: number;
    name: string;
    base: number;
    description: string;
}

export interface CustomSkill {
    _id: ObjectId;
    name: string;
    base: number;
    description: string;
    type: "combat" | "terrain" | "clan";
}