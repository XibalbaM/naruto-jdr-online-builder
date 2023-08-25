import CharacterModel from "../models/character.model.js";
import Character from "../classes/character.class.js";

export default class PredrawnService {

    static async getAll() {
        return (await CharacterModel.find({isPredrawn: true}).select("_id")).map((character) => character._id.toString());
    }

    static async add(id: string) {
        await CharacterModel.findByIdAndUpdate(id, {isPredrawn: true});
    }

    static async remove(id: string) {
        await CharacterModel.findByIdAndUpdate(id, {isPredrawn: false});
    }
}