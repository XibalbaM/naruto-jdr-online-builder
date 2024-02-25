import mongoose from "mongoose";

/**
 * Describes a base, in a more convenient and lightweight way than the model
 * @Class Base
 */
export default class Base {
    _id: number;
    fullName: string;
    shortName: string;
    description: string;

    /**
     * Creates a new base from a model
     * @param modelBase The model to create the base from
     */
    static fromModel(modelBase): Base {

        const base = new Base();
        base._id = modelBase._id;
        base.fullName = modelBase.fullName;
        base.shortName = modelBase.shortName;
        base.description = modelBase.description;

        return base;
    }
}