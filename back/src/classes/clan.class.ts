import mongoose from "mongoose";
import Line from "./line.class.js";

/**
 * Describes a clan, in a more convenient and lightweight way than the model
 * @Class Clan
 */
export default class Clan {
    _id: mongoose.Types.ObjectId;
    name: string;
    village: mongoose.Types.ObjectId;
    description: string;
    line: Line;

    /**
     * Creates a new clan from a model
     * @param modelClan The model to create the clan from
     */
    static fromModel(modelClan): Clan {

        const clan = new Clan();
        clan._id = modelClan._id;
        clan.name = modelClan.name;
        clan.village = modelClan.village;
        clan.description = modelClan.description;
        clan.line = modelClan.line;

        return clan;
    }
}