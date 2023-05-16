import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ComponentType, Interaction, CommandInteraction, Snowflake, ButtonInteraction} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import authService from "../services/auth.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("connexion")
        .setDescription("Permet de connecter son compte discord à son compte en ligne")
        .addStringOption(option => option.setName("email").setDescription("L'adresse email de votre compte en ligne").setRequired(true)),
    async execute(interaction) {
        const email = interaction.options.get("email")!.value as string;
        if (!email || !email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            await interaction.reply({
                content: "L'adresse email est invalide",
                ephemeral: true,
            });
            return;
        }
        if (await authService.isDiscordAccountLinked(interaction.user.id)) {
            await interaction.reply({
                content: "Votre compte discord est déjà lié à un compte en ligne. Vous pouvez le délier avec la commande `/déconnexion`.",
                ephemeral: true,
            });
            return;
        }
        if (await authService.onlineAccountExists(email)) {
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

            const proposalMessage = await interaction.reply({
                content: "Vous n’avez pas encore de compte sur notre application.\nLier votre profile discord à l’application entraine une création de compte automatique.",
                ephemeral: true,
                components: [buttons as any],
            });
            proposalMessage.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
                if (i.customId === "create-account") {
                    await sendEmailAndReply(email, interaction.user.id, i);
                } else {
                    await i.reply({
                        content: "Ok, vous pouvez créer un compte à tout moment en utilisant la commande `/connexion`",
                        components: [],
                        ephemeral: true,
                    });
                }
            })
        }
    },
};

async function sendEmailAndReply(email: string, userId: Snowflake, interaction: CommandInteraction | ButtonInteraction) {
    const response = await authService.sendVerificationEmail(email, userId);
    switch (response) {
        case "success":
            await interaction.reply({
                content: "Un email de vérification a bien été envoyé à l'adresse " + email + ". Pensez à vérifier vos spams !",
                ephemeral: true,
            });
            break;
        case "too many requests":
            await interaction.reply({
                content: "Un email a déjà été envoyé à cette adresse. Veuillez vérifier vos spams, ou patienter quelques minutes avant de réessayer",
                ephemeral: true,
            });
            break;
        case "already linked":
            await interaction.reply({
                content: "Ce compte en ligne est déjà lié à un compte discord. Si vous voulez connecter ce compte discord à la place, veuillez d'abord déconnecter l'autre compte via le site ou en utilisant la commande `/déconnexion` depuis l'autre compte.",
                ephemeral: true,
            });
            break;
        case "server error":
            await interaction.reply({
                content: "Une erreur interne inconnue est survenue. Si le problème persiste, veuillez contacter un administrateur.",
                ephemeral: true,
            });
            break;
    }
}

export default command;