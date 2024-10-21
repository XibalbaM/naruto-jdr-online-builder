export default interface Skill {
    _id: number;
    name: string;
    base: number;
    description: string;
    villages: string[];
}

export interface _CustomSkill {
    _id: any;
    name: string;
    base: number;
    description: string;
    villages: string[];
    type: "combat" | "terrain" | "clan";
}