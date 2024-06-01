import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ComponentType} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import CharacterService from "../services/character.service";
import StateService from "../services/state.service";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("personnages")
        .setDescription("Donne la liste des personnages du compte en ligne."),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        const characters = await CharacterService.getCharacters(interaction.user.id);
        // @ts-ignore
        if (characters.length === 0) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_CHARACTER);
        }
        const rows = [];
        for (const character of characters) {
            rows.push(new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(character._id)
                    .setLabel(character.name)
                    .setStyle(ButtonStyle.PRIMARY)
            ));
        }
        let message = await Responses.success(interaction, Messages.CHARACTER.CHARACTERS_LIST(characters), true, rows);
        message.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
            StateService.setSelectedCharacter(interaction.user.id, i.customId);
            await Responses.success(i, Messages.CHARACTER.CHARACTER_SELECTED(characters.find(c => c._id === i.customId)!.name));
        })
    }
};

export default command;