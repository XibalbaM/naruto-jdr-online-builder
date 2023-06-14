import {ObjectId} from "mongoose";

/**
 * Describes a rank, in a more convenient and lightweight way than the model
 * @Class Rank
 */
export default class Rank {
    _id: ObjectId;
    name: string;

    /**
     * Creates a new rank from a model
     * @param modelRank The model to create the rank from
     */
    static fromModel(modelRank): Rank {

        const rank = new Rank();
        rank._id = modelRank._id;
        rank.name = modelRank.name;

        return rank;
    }
}