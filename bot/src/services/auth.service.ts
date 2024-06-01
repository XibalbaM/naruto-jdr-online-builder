import {Snowflake} from "discord.js";
import apiUtils from "../utils/api.utils.js";

export default class AuthService {

    static async isDiscordAccountLinked(id: Snowflake): Promise<boolean> {
        const response = await apiUtils.get("/user/linked", id);
        return response.status === 200;
    }

    static async onlineAccountExists(email: string): Promise<boolean> {
        const response = await apiUtils.get("/user/exists/" + email);
        return response.status === 200;
    }

    static async sendVerificationEmail(email: string, discordId: Snowflake): Promise<"success" | "too many requests" | "server error" | "already linked"> {
        const response = await apiUtils.post("/auth", {discordId: discordId, email: email});
        switch (response.status) {
            case 202:
                return "success";
            case 429:
                return "too many requests";
            default:
                return "server error";
        }
    }

    static async unlinkDiscordAccount(id: Snowflake): Promise<boolean> {
        const response = await apiUtils.del("/user", id);
        return response.status === 200;
    }
}