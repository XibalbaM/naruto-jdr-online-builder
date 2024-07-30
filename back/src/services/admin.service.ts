import UserModel from "../models/user.model.js";
import {requestEmail} from "./auth.service.js";

export default class AdminService {
    static async getUsers() {
        return UserModel.find().lean();
    }

    static async getUser(id: string) {
        return UserModel.findById(id).lean();
    }

    static async sendEmail(id: string) {
        let user = await UserModel.findById(id).lean().select("email discordId");
        await requestEmail(user!.email, user!.discordId, true);
    }

    static async disconnectDiscord(id: string) {
        return UserModel.findByIdAndUpdate(id, {$unset: {discordId: 1}});
    }

    static async deleteUser(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}