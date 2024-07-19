import CharacterModel from "../models/character.model.js";
import Character from "../classes/character.class.js";
import UserModel from "../models/user.model.js";

export default class PredrawnService {

    static async getAll() {
        return (await CharacterModel.find({shareStatus: "predrawn"}).lean().select("_id")).map((character) => character._id.toString());
    }

    static async take(userId: string, id: string) {
        if (await CharacterModel.exists({_id: id, shareStatus: "predrawn"})) {
            const character = Character.fromModel(await CharacterModel.findById(id).lean());
            character.shareStatus = "private";
            delete character._id;
            const newCharacter = Character.fromModel(await CharacterModel.create(character));
            await UserModel.findByIdAndUpdate(userId, {$push: {characters: newCharacter._id}});
            return newCharacter;
        } else {
            throw new Error("Character is not predrawn");
        }
    }

    static async add(id: string) {
        const character = Character.fromModel(await CharacterModel.findById(id).lean());
        if (character.shareStatus === "predrawn") {
            throw new Error("Character is already predrawn");
        }
        character.shareStatus = "predrawn";
        delete character._id;
        const newCharacter = await CharacterModel.create(character);
        return newCharacter._id.toString();
    }

    static async remove(id: string) {
        if (await CharacterModel.exists({_id: id, shareStatus: "predrawn"})) {
            await CharacterModel.findByIdAndDelete(id);
        } else {
            throw new Error("Character is not predrawn");
        }
    }
}