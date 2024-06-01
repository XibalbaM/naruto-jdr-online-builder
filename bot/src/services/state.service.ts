import Character from "../models/character.model.js";

export default class StateService {

    static userData: Map<string, {isInSenseiMode: boolean, selectedCharacter?: Character}> = new Map();
    static defaultUserData: {isInSenseiMode: boolean} = {isInSenseiMode: false};

    static setInSenseiMode(userId: string, isInSenseiMode: boolean) {
        this.userData.set(userId, {
            ...this.defaultUserData,
            ...this.userData.get(userId),
            isInSenseiMode
        });
    }

    static isInSenseiMode(userId: string) {
        return this.userData.get(userId)?.isInSenseiMode ?? false;
    }

    static setSelectedCharacter(userId: string, character: Character | undefined) {
        this.userData.set(userId, {
            ...this.defaultUserData,
            ...this.userData.get(userId),
            selectedCharacter: character
        });
    }

    static getSelectedCharacter(userId: string) {
        return this.userData.get(userId)?.selectedCharacter;
    }
}