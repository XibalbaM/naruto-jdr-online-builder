import mongoose from "mongoose";

/**
 * Describes a village, in a more convenient and lightweight way than the model
 * @Class Village
 */
export default class Village {
    _id: mongoose.Types.ObjectId;
    name: string;

    /**
     * Creates a new village from a model
     * @param modelVillage The model to create the village from
     */
    static fromModel(modelVillage): Village {

        const village = new Village();
        village._id = modelVillage._id;
        village.name = modelVillage.name;

        return village;
    }
}