import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ComponentType} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import CharacterService from "../services/character.service.js";
import StateService from "../services/state.service.js";

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
        const rows: ActionRowBuilder[] = [];
        for (let i = 1; i <= Math.ceil(characters.length/5); i += 1) {
            rows.push(new ActionRowBuilder());
        }
        characters.forEach((character, index) => {
            if (index >= 25) return;
            rows[Math.floor(index/5)].addComponents(
                new ButtonBuilder()
                    .setCustomId(character._id)
                    .setLabel(character.name)
                    .setStyle(ButtonStyle.PRIMARY)
            );
        });
        let message = await Responses.success(interaction, Messages.CHARACTER.CHARACTERS_LIST(characters), true, rows);
        message.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
            StateService.setSelectedCharacter(interaction.user.id, await CharacterService.getCharacter(i.customId, interaction.user.id));
            await Responses.success(i, Messages.CHARACTER.CHARACTER_SELECTED(characters.find(c => c._id === i.customId)!.name));
        })
    }
};

export default command;