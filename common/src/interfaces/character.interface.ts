export default interface _Character {
    _id: any;
    firstName: string;
    clan: {
        id: string; // "custom" for custom clans
        clanName?: string; // Custom name if id is "custom", otherwise unused
    };
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