import {ActionRowBuilder, ButtonBuilder, ComponentType, SlashCommandBuilder} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("fiche-personnage")
        .setDescription("Donne les caractéristiques d'un personnage."),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        let buttons = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setCustomId("bases").setLabel("Bases").setStyle(ButtonStyle.PRIMARY))
            .addComponents(new ButtonBuilder().setCustomId("common-skills").setLabel("Compétences communes").setStyle(ButtonStyle.PRIMARY))
            .addComponents(new ButtonBuilder().setCustomId("custom-skills").setLabel("Compétences de terrain/combat/clan").setStyle(ButtonStyle.PRIMARY))
            .addComponents(new ButtonBuilder().setCustomId("spes").setLabel("Spécialisations de chakra").setStyle(ButtonStyle.PRIMARY))
        let character = StateService.getSelectedCharacter(interaction.user.id)!
        let message = await Responses.success(interaction, Messages.CHARACTER.CHARACTER_INFO(character), true, [buttons]);
        message.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
            switch (i.customId) {
                case "bases":
                    await Responses.success(i, Messages.CHARACTER.BASES(character), true);
                    break;
                case "common-skills":
                    await Responses.success(i, Messages.CHARACTER.COMMON_SKILLS(character), true);
                    break;
                case "custom-skills":
                    await Responses.success(i, Messages.CHARACTER.CUSTOM_SKILLS(character), true);
                    break;
                case "spes":
                    await Responses.success(i, Messages.CHARACTER.SPES(character), true);
                    break;
            }
        })
    }
};

export default command;