import mongoose from "mongoose";

/**
 * Describes a modifier, in a more convenient and lightweight way than the model
 * @Class Modifier
 */
export default class Modifier {
    _id: mongoose.Types.ObjectId;
    label: string;
    applyTo: string; //To be changed
    value: number;
    operator: "add" | "substract" | "multiply" | "divide";

    /**
     * Creates a new modifier from a model
     * @param modelModifier The model to create the modifier from
     */
    static fromModel(modelModifier): Modifier {

        const modifier = new Modifier();
        modifier._id = modelModifier._id;
        modifier.label = modelModifier.label;
        modifier.applyTo = modelModifier.applyTo;
        modifier.value = modelModifier.value;
        modifier.operator = modelModifier.operator;

        return modifier;
    }
}