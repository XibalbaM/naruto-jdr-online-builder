import {Client} from "discord.js";

export default class CustomClient extends Client {
    commands: Map<string, any>;
    events: Map<string, any>;
}