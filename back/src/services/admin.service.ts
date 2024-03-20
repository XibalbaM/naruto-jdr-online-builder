import UserModel from "../models/user.model.js";

export default class AdminService {
    static async getUsers() {
        return UserModel.find();
    }

    static async disconnectDiscord(id: string) {
        return UserModel.findByIdAndUpdate(id, {$unset: {discordId: 1}});
    }

    static async deleteUser(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}