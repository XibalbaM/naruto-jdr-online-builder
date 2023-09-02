export default class StateService {

    static userData: Map<string, {isInSenseiMode: boolean}> = new Map();

    static setInSenseiMode(userId: string, isInSenseiMode: boolean) {
        this.userData.set(userId, {
            ...this.userData.get(userId),
            isInSenseiMode
        });
    }

    static isInSenseiMode(userId: string) {
        return this.userData.get(userId)?.isInSenseiMode ?? false;
    }
}