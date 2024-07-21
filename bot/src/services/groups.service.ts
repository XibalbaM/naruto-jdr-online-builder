import {Snowflake} from "discord.js";
import ApiUtils from "../utils/api.utils.js";

export default class GroupsService {

    static async list(id: Snowflake): Promise<string[]> {
        return await ApiUtils.get<{groups: [{name: string}]}>("/groups", id).then(res => {
            if (res.status === 200) {
                return res.data.groups.map(group => group.name);
            } else if (res.status === 401) {
                throw new Error("no account linked");
            } else {
                console.error(res);
                throw new Error("unknown error");
            }
        });
    }

    static async select(id: Snowflake, commandId: number): Promise<string> {
        return await ApiUtils.post<{name: string}>("/groups/select", {commandId}, id).then(res => {
            if (res.status === 200) {
                return res.data.name;
            } else if (res.status === 401) {
                throw new Error("no account linked");
            } else if (res.status === 404) {
                throw new Error("group not found");
            } else {
                console.error(res);
                throw new Error("unknown error");
            }
        });
    }

    static async getSelected(id: Snowflake): Promise<string> {
        return await ApiUtils.get<{name: string}>("/groups/select", id).then(res => {
            console.log(res);
            if (res.status === 200) {
                return res.data.name;
            } else if (res.status === 401) {
                throw new Error("no account linked");
            } else if (res.status === 404) {
                throw new Error("no selected group");
            } else {
                console.error(res);
                throw new Error("unknown error");
            }
        });
    }
}