import mongoose from "mongoose";

/**
 * Describes a road, in a more convenient and lightweight way than the model
 * @Class Road
 */
export default class Road {
    _id: mongoose.Types.ObjectId;
    name: string;
    longName: string;

    /**
     * Creates a new road from a model
     * @param modelRoad The model to create the road from
     */
    static fromModel(modelRoad): Road {

        const road = new Road();
        road._id = modelRoad._id;
        road.name = modelRoad.name;
        road.longName = modelRoad.longName;

        return road;
    }
}