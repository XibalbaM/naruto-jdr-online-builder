import Base from "../models/base.model.js";
import ChakraSpe from "../models/chakra-spe.model.js";
import Clan from "../models/clan.model.js";
import Rank from "../models/rank.model.js";
import Road from "../models/road.model.js";
import {CustomSkill, Skill} from "../models/skill.model.js";
import Village from "../models/village.model.js";
import apiUtls from "../utils/api.utils.js";
import config from "../config/env.js";

export default class DataService {

    static bases: Base[] = []
    static spes: ChakraSpe[] = []
    static clans: Clan[] = []
    static ranks: Rank[] = []
    static roads: Road[] = []
    static commonSkills: Skill[] = []
    static customSkills: CustomSkill[] = []
    static villages: Village[] = []

    static async refreshData() {
        DataService.bases = await this.fetch('bases')
        DataService.spes = await this.fetch('chakraSpes')
        DataService.clans = await this.fetch('clans')
        DataService.ranks = await this.fetch('ranks')
        DataService.roads = await this.fetch('roads')
        DataService.commonSkills = await this.fetch('skills/common')
        DataService.customSkills = await this.fetch('skills/custom')
        DataService.villages = await this.fetch('villages')
    }

    private static async fetch<T>(name: string) {
        const response = await apiUtls.get<T>(`${config.api_url}/${name}`)
        return response.data;
    }
}