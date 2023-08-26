import CharacterModel from "../models/character.model.js";
import Character from "../classes/character.class.js";
import UserModel from "../models/user.model.js";

export default class PredrawnService {

    static async getAll() {
        return (await CharacterModel.find({isPredrawn: true}).select("_id")).map((character) => character._id.toString());
    }

    static async take(userId: string, id: string) {
        if (await CharacterModel.exists({_id: id, isPredrawn: true})) {
            const character = Character.fromModel(await CharacterModel.findById(id));
            character.isPredrawn = false;
            delete character._id;
            const newCharacter = Character.fromModel(await CharacterModel.create(character));
            await UserModel.findByIdAndUpdate(userId, {$push: {characters: newCharacter._id}});
            return newCharacter;
        } else {
            throw new Error("Character is not predrawn");
        }
    }

    static async add(id: string) {
        const character = Character.fromModel(await CharacterModel.findById(id));
        if (character.isPredrawn) {
            throw new Error("Character is already predrawn");
        }
        character.isPredrawn = true;
        delete character._id;
        const newCharacter = await CharacterModel.create(character);
        return newCharacter._id.toString();
    }

    static async remove(id: string) {
        if (await CharacterModel.exists({_id: id, isPredrawn: true})) {
            await CharacterModel.findByIdAndDelete(id);
        } else {
            throw new Error("Character is not predrawn");
        }
    }
}