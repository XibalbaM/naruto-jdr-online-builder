import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ComponentType, Interaction, CommandInteraction, Snowflake, ButtonInteraction} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("connexion")
        .setDescription("Permet de connecter son compte discord à son compte en ligne")
        .addStringOption(option => option.setName("email").setDescription("L'adresse email de votre compte en ligne").setRequired(true)),
    async execute(interaction) {
        const email = interaction.options.get("email")!.value as string;
        if (!email || !email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            await Responses.success(interaction, Messages.ERRORS.INVALID_EMAIL);
            return;
        }
        if (await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            await Responses.error(interaction, Messages.LINKING.ACCOUNT_ALREADY_LINKED)
            return;
        }
        if (await AuthService.onlineAccountExists(email)) {
            await sendEmailAndReply(email, interaction.user.id, interaction);
        } else {
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("create-account")
                    .setLabel("Ok, créer un compte")
                    .setStyle(ButtonStyle.SUCCESS),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel("Non merci")
                    .setStyle(ButtonStyle.DANGER)
            );

            const proposalMessage = await Responses.success(interaction, Messages.LINKING.LINK_WITHOUT_ACCOUNT, true, [buttons]);
            proposalMessage.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
                if (i.customId === "create-account") {
                    await sendEmailAndReply(email, interaction.user.id, i);
                } else {
                    await Responses.success(i, Messages.LINKING.LINK_WITHOUT_ACCOUNT_CANCELED);
                }
            })
        }
    },
};

async function sendEmailAndReply(email: string, userId: Snowflake, interaction: CommandInteraction | ButtonInteraction) {
    const response = await AuthService.sendVerificationEmail(email, userId);
    switch (response) {
        case "success":
            await Responses.success(interaction, Messages.LINKING.EMAIL_SENT(email));
            break;
        case "too many requests":
            await Responses.error(interaction, Messages.LINKING.EMAIL_ALREADY_SENT)
            break;
        case "already linked":
            await Responses.error(interaction, Messages.LINKING.OTHER_DISCORD_ACCOUNT_ALREADY_LINKED);
            break;
        case "server error":
            await Responses.error(interaction, Messages.ERRORS.UNKNOWN);
            break;
    }
}

export default command;