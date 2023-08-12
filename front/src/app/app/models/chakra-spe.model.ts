/**
 * Class representing a ChakraSpe.
 * @class ChakraSpe
 */
export default class ChakraSpe {
	_id!: string;
	name!: string;
	max!: number;
    effect!: string;

	constructor(spe: ChakraSpe) {
		Object.assign(this, spe);
	}
}
