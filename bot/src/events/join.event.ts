import {BotEvent} from "../classes.js";
import {Events, GuildMember, TextChannel} from "discord.js";
import config from "../config/env.js";
import Messages from "../utils/messages.utils.js";

const event: BotEvent = {
    name: Events.GuildMemberAdd,
    async execute(member: GuildMember) {
        await (await member.guild.channels.fetch(config.welcomeChannel) as TextChannel)?.send(Messages.WELCOME(member));
    },
};

export default event;