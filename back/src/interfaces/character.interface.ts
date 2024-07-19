import {ObjectId} from "mongoose";

export default interface Character {
    _id: ObjectId;
    firstName: string;
    clan: string;
    village: string;
    road?: string;
    xp: number;
    rank: string;
    bases: number[];
    commonSkills: number[];
    customSkills: {skill: string, level: number}[];
    nindo: string;
    nindoPoints: number;
    chakraSpes: string[];
    notes: string;
    shareStatus: "private" | "not-referenced" | "public" | "predrawn";
    createdAt: Date;
    updatedAt: Date;
}