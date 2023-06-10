import mongoose from "mongoose";

/**
 * Describes a storyArc, in a more convenient and lightweight way than the model
 * @Class StoryArc
 */
export default class StoryArc {
    _id: mongoose.Types.ObjectId;
    isClanArc: boolean;
    name: string;
    description: string;

    /**
     * Creates a new storyArc from a model
     * @param modelStoryArc The model to create the storyArc from
     */
    static fromModel(modelStoryArc): StoryArc {

        const storyArc = new StoryArc();
        storyArc._id = modelStoryArc._id;
        storyArc.isClanArc = modelStoryArc.isClanArc;
        storyArc.name = modelStoryArc.name;
        storyArc.description = modelStoryArc.description;

        return storyArc;
    }
}