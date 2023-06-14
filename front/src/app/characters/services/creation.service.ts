import { Injectable } from '@angular/core';
import Character from "../../app/models/character.model";
import Village from "../../app/models/village.model";
import Clan from "../../app/models/clan.model";
import Road from "../../app/models/road.model";
import Rank from "../../app/models/rank.model";
import Skill from "../../app/models/skill.model";

@Injectable({
  providedIn: 'root'
})
export class CreationService {

  step?: number;
  character!: Character;

  constructor() { }

  /**
   * If no creation is in progress, begin a new one.
   *
   * Else, return the current step.
   * @param force If true, force a new creation, even if one is in progress.
   * @returns The current step of the creation process.
   */
  beginCreation(force: boolean = false): number | void {
    if (this.step && !force) {
      return this.step;
    }

    this.step = 1;
    this.character = new Character();
  }

  /**
   * Get data from the first step of the creation process.
   * @param village The village of the character.
   * @param firstName The first name of the character.
   * @param clan The clan of the character.
   * @param rank The rank of the character.
   * @param xp The xp of the character.
   * @param road The road of the character.
   */
  stepOne(village: Village, firstName: string, clan: Clan, rank: Rank, xp: number, road?: Road): boolean {
    if (this.step !== 1) {
      return false;
    }

    this.character.village = village;
    this.character.firstName = firstName;
    this.character.clan = clan;
    this.character.rank = rank;
    this.character.xp = xp;
    this.character.road = road;

    return true;
  }

  /**
   * Get data from the second step of the creation process.
   * @param nindo The nindo of the character.
   * @param story The story of the character.
   */
  stepTwo(nindo: string, story: string): boolean {
    if (this.step !== 2) {
      return false;
    }

    this.character.nindo = nindo;
    this.character.story = story;

    return true;
  }

  /**
   * Get data from the third step of the creation process.
   * @param skills The skills of the character, including the clan skills.
   */
  stepThree(skills: Skill[]): boolean {
    if (this.step !== 3) {
      return false;
    }
    this.character.skills = new Map<Skill, number>();

    for (let skill of skills) {
      this.character.skills.set(skill, 1);
    }

    return true;
  }
}
