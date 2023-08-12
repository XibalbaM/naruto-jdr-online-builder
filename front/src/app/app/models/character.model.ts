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
	bases: { base: string, level: number }[] = [];
	skills: { skill: string, level: number }[] = [];
	nindo!: string;
	nindoPoints!: number;
	chakraSpes: { spe: string, level: number }[] = [];
	notes!: string;

	constructor(character?: Character) {
		if (character) Object.assign(this, character);
	}

	toCreate() {
		return {
			notes: this.notes,
			firstName: this.firstName,
			clan: this.clan,
			village: this.village,
			xp: this.xp,
			nindo: this.nindo
		}
	}
}
