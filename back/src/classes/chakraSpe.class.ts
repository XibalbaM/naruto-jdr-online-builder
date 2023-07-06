import {ObjectId} from "mongoose";

/**
 * Describes a chakraSpe, in a more convenient and lightweight way than the model
 * @Class ChakraSpe
 */
export default class ChakraSpe {
	_id: ObjectId;
	name: string;
	max: number;

	/**
	 * Creates a new chakraSpe from a model
	 * @param modelChakraSpe The model to create the chakraSpe from
	 */
	static fromModel(modelChakraSpe): ChakraSpe {

		const chakraSpe = new ChakraSpe();
		chakraSpe._id = modelChakraSpe._id;
		chakraSpe.name = modelChakraSpe.name;
		chakraSpe.max = modelChakraSpe.max;

		return chakraSpe;
	}
}