import CharacterModel from "../models/character.model.js";
import Character from "../interfaces/character.interface.js";
import UserModel from "../models/user.model.js";
import User from "../interfaces/user.interface.js";

export default class PredrawnService {

    static async getAll(): Promise<{ character: Character, ownerName: string }[]> {
        let characters = (await CharacterModel.find({shareStatus: "predrawn"}).lean()) as Character[];
        return Promise.all(characters.map(async (character) => {
            let ownerName = (await UserModel.findOne({characters: character._id}).lean().select("username"))!.username || "Ninja sans nom";
            return {character, ownerName};
        }));
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
        await UserModel.updateMany({characters: id}, {$push: {characters: newCharacter._id}});
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