import _Character from "../interfaces/character.interface";
import _Rank from "../interfaces/rank.interface";
import Base from "../interfaces/base.interface";
import _ChakraSpe from "../interfaces/chakraSpe.interface";
import _Clan from "../interfaces/clan.interface";
import Skill, {_CustomSkill} from "../interfaces/skill.interface";
import _User from "../interfaces/user.interface";

const xpUsedByBasePerLevel = {
    0: 0,
    1: 0,
    2: 15,
    3: 35,
    4: 60,
    5: 90,
    6: 125,
    7: 165,
    8: 210,
    9: 260,
    10: 315,
    11: 375,
    12: 440,
    13: 510,
    14: 585,
    15: 675,
    16: 775,
}
const xpUsedBySkillPerLevel = {
    0: 0,
    1: 0,
    2: 2,
    3: 5,
    4: 9,
    5: 14,
    6: 20,
    7: 27,
    8: 35,
    9: 44,
    10: 54,
    11: 65,
    12: 77,
    13: 90,
    14: 104,
    15: 119,
    16: 135,
    17: 152,
    18: 170,
}

function idToData<T extends { _id: string | number }>(id: string | number, data: T[]): T {
    return data.find(d => d._id === id)!;
}

export function totalXp(character: _Character): number {
    let xpUsed = 0;
    for (const skill of character.commonSkills) {
        xpUsed += xpUsedBySkillPerLevel[skill as keyof typeof xpUsedBySkillPerLevel];
    }
    for (const skill of character.customSkills) {
        xpUsed += xpUsedBySkillPerLevel[skill.level as keyof typeof xpUsedBySkillPerLevel];
    }
    for (const base of character.bases) {
        xpUsed += xpUsedByBasePerLevel[base as keyof typeof xpUsedByBasePerLevel];
    }
    return character.xp - xpUsed;
}

export function xpToRank<T extends _Rank>(xp: number, ranks: T[]): T {
    for (const rank of ranks.sort((a, b) => b.minXp - a.minXp)) {
        if (rank.minXp < xp) {
            return rank;
        }
    }
    return ranks[0];
}

export function baseLevel(character: _Character, baseShortName: string, bases: Base[]): number {
    return character.bases[bases.find(base => base.shortName === baseShortName)!._id];
}

export function baseLevelId(character: _Character, baseId: number): number {
    return character.bases[baseId];
}

export function chakraControl(character: _Character): number {
    return baseLevelId(character, 0) + baseLevelId(character, 1);
}

export function chakraRegen(character: _Character, clans: _Clan[], chakraSpes: _ChakraSpe[]): number {
    return Math.floor(maxChakra(character, clans, chakraSpes) * (1 + chakraSpeAmount(character, 'Inépuisable', chakraSpes)) / 100);
}

export function chakraSpeAmount(character: _Character, speName: string, chakraSpes: _ChakraSpe[]): number {
    return character.chakraSpes.filter(spe => spe === chakraSpes.find(spe => spe.name === speName)?._id).length;
}

export function interceptions(character: _Character, type: "ARM" | "TAI", bases: Base[]): number {
    return Math.max(1, Math.floor(baseLevel(character, type, bases) / 2));
}

export function maxChakra(character: _Character, clans: _Clan[], spes: _ChakraSpe[]): number {
    let clanBonus = 0;
    let clan = idToData(character.clan, clans);
    switch (clan?._id) {
        case "64e8d2def43b640ea9eae3b9": // Eshimuro
            clanBonus = 50 * character.bases[6];
            break;
    }
    return (50 * chakraControl(character))
        + (100 * chakraSpeAmount(character, "Colossal", spes))
        + (50 * chakraSpeAmount(character, "Endurci", spes))
        + (50 * chakraSpeAmount(character, "Impérieux", spes))
        + clanBonus;
}

export function maxChakraSpes(character: _Character): number {
    const chakraControlValue = chakraControl(character);
    let maxChakraSpes = 1;
    if (chakraControlValue >= 5) {
        maxChakraSpes += 1;
    }
    if (chakraControlValue >= 10) {
        maxChakraSpes += 2;
    }
    if (chakraControlValue >= 14) {
        maxChakraSpes += 2;
    }
    if (chakraControlValue >= 20) {
        maxChakraSpes += 3;
    }
    if (chakraControlValue >= 24) {
        maxChakraSpes += 5;
    }
    return maxChakraSpes;
}

export function maxSkillCount(character: _Character): number {
    const highestBase = JSON.parse(JSON.stringify(character.bases)).sort((a: number, b: number) => b - a)[0];
    return 5 + (highestBase >= 5 ? 1 + (highestBase >= 7 ? 1 + (highestBase >= 10 ? 1 : 0) : 0) : 0);
}

export function skillNaturalLevel(character: _Character, skillName: string, commonSkills: Skill[], customSkills: _CustomSkill[]): number {
    const skillId = commonSkills.find(skill => skill.name === skillName)?._id;
    if (skillId !== undefined) {
        return character.commonSkills[Number(skillId)];
    } else {
        const customSkill = customSkills.find(skill => skill.name === skillName)!;
        return character.customSkills.find(skill => skill.skill === customSkill._id)?.level || 0;
    }
}

export function skillReinforcement(character: _Character, skillName: string, commonSkills: Skill[], customSkills: _CustomSkill[]): number {
    return Math.floor(skillTotalLevel(character, skillName, commonSkills, customSkills) / 2);
}

export function skillTotalLevel(character: _Character, skillName: string, commonSkills: Skill[], customSkills: _CustomSkill[]): number {
    const skill = commonSkills.find(skill => skill.name === skillName) ?? customSkills.find(skill => skill.name === skillName)!;
    return skillNaturalLevel(character, skillName, commonSkills, customSkills) + character.bases[skill.base];
}

export function skillTypeName(skill: Skill | _CustomSkill): string {
    if (typeof skill._id === "number") {
        return "Compétence commune";
    } else {
        switch ((skill as _CustomSkill).type) {
            case "combat":
                return "Compétence de combat";
            case "terrain":
                return "Compétence de terrain";
            case "clan":
                return "Compétence de clan";
            default:
                return "Compétence commune";
        }
    }
}

export function fullName(character: _Character, clans: _Clan[]): string {
    return `${character.firstName} ${idToData(character.clan, clans).name}`;
}

export function canUserReadCharacter(user: _User, character: _Character) {
    return user.isAdmin || character.shareStatus !== "private" || user.characters.map(value => value.toString()).includes(character._id.toString());
}

export function canUserEditCharacter(user: _User, characterId: string) {
    return user.characters.map(value => value.toString()).includes(characterId);
}