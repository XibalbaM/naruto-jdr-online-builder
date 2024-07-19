import CharacterModel from "../models/character.model.js";
import Character from "../interfaces/character.interface";
import UserModel from "../models/user.model.js";
import User from "../interfaces/user.interface";

export default class PredrawnService {

    static async getAll() {
        return (await CharacterModel.find({shareStatus: "predrawn"}).lean().select("_id")).map((character) => character._id.toString());
    }

    static async take(user: User, id: string): Promise<Character> {
        if (await CharacterModel.exists({_id: id, shareStatus: "predrawn"})) {
            const character = (await CharacterModel.findById(id).lean()) as Partial<Character>;
            character.shareStatus = "private";
            delete character._id;
            const newCharacter = await CharacterModel.create(character);
            await UserModel.findByIdAndUpdate(user._id, {$push: {characters: newCharacter._id}});
            return newCharacter;
        } else {
            throw new Error("Character is not predrawn");
        }
    }

    static async add(id: string) {
        const character = (await CharacterModel.findById(id).lean())!;
        if (character.shareStatus === "predrawn") {
            throw new Error("Character is already predrawn");
        }
        let data = character as Partial<Character>;
        data.shareStatus = "predrawn";
        delete data._id;
        const newCharacter = await CharacterModel.create(data);
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