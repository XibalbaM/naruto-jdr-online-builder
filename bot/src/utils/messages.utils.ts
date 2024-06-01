import Character from "../models/character.model.js";

/**
 * Class containing messages texts. Grouped here so they can easily be changed.
 */
export default class Messages {

    static DICE = {
        INVALID_INPUT: "La formule n'est pas valide.",
        D: "https://tenor.com/view/gad-elmaleh-r%C3%A9ponse-d-qui-veut-gagner-des-millions-gif-19797483",
	    SUCCESS: (input: string, result: number, details: string | undefined, username: string, label: string | null) =>
            (label ? `Jet de ${username} [${label}]` : `Jet de ${username}`) +
            ` :\nJet : \`[${input}]\`${details ? `Détails : \`${details}\`` : ""} Résultat : \`${result}\``
    }

    static LINKING = {
        NO_ACCOUNT_LINKED: "Votre compte discord n'est pas encore lié à un compte en ligne. Vous pouvez le lier avec la commande `/connexion`.",
        ACCOUNT_ALREADY_LINKED: "Votre compte discord est déjà lié à un compte en ligne. Vous pouvez le délier avec la commande `/déconnexion` ou via la page de profile sur notre site.",
        LINK_WITHOUT_ACCOUNT: "Vous n’avez pas encore de compte sur notre application.\nLier votre profile discord à l’application entraine une création de compte automatique.",
        LINK_WITHOUT_ACCOUNT_CANCELED: "Ok, vous pouvez créer un compte à tout moment en utilisant la commande `/connexion` !",
        OTHER_DISCORD_ACCOUNT_ALREADY_LINKED: "Ce compte en ligne est déjà lié à un compte discord. Si vous voulez connecter ce compte discord à la place, veuillez d'abord déconnecter l'autre compte via le site ou en utilisant la commande `/déconnexion` depuis l'autre compte.",
        EMAIL_SENT: (email: string) => "Un email de vérification a bien été envoyé à l'adresse " + email + ". Pensez à vérifier vos spams !",
        EMAIL_ALREADY_SENT: "Un email a déjà été envoyé à cette adresse. Veuillez vérifier vos spams, ou patienter quelques minutes avant de réessayer",
        UNLINKED: "Votre compte discord a été délié de votre compte en ligne.",
        UNLINK_FAILED: "Une erreur est survenue lors de la déconnexion de votre compte discord.",
        STATUS: (linked: boolean) => linked ? "Votre compte discord est bien lié à un compte en ligne." : "Votre compte discord n'est pas lié à un compte en ligne.",
    }

    static GROUPS = {
        LIST: (groups: string[]) => `Vous êtes dans les groupes suivants : ${groups.map((group, i) => `\n${i++}. ` + group).join()}`,
        GROUP_NOT_FOUND: "Le groupe n'a pas été trouvé.",
        SELECTED: (group: string) => `Le groupe ${group} a bien été sélectionné.`,
        WAS_SELECTED: (group: string) => `Le groupe sélectionné est ${group}.`,
        NO_SELECTED_GROUP: "Aucun groupe n'est sélectionné.",
    }

    static ERRORS = {
        INVALID_EMAIL: "L'adresse email que vous avez entrée n'est pas valide.",
        UNKNOWN: "Une erreur inconnue est survenue. Veuillez réessayer ou, si l'erreur persiste, contactez <@569895047026180135>.",
        NOT_IMPLEMENTED: "Cette commande n'est pas encore implémentée.",
    }

    static IMAGES = {
        MAP: {title: "Carte du monde", url: "./assets/map.webp"}
    }

    static CHARACTER = {
        NO_CHARACTER: "Aucun personnage n'a été trouvé.",
        CHARACTERS_LIST: (characters: {name: string, xp: number}[]) => `Voici la liste de vos personnages : ${characters.map((character, i) => `\n${i++}. ${character.name} (${character.xp} XP)`).join()}\nCliquez sur l'un d'entre eux pour le sélectionner.`,
        CHARACTER_SELECTED: (name: string) => `Le personnage ${name} a bien été sélectionné.`,
        NO_SELECTED_CHARACTER: "Aucun personnage n'est sélectionné.",
        CHARACTER_INFO: (character: Character) => {
            let message = `Voici les informations sur le personnage ${character.firstName} :\n`;
            message += `XP : ${character.xp}\n`;
            message += `Nindô : ${character.nindo}\n`;
            message += `Points de nindô : ${character.nindoPoints}\n`;
            message += `Modifié le : <t:${Math.floor(Date.parse(character.updatedAt as unknown as string)/1000)}:R>\n`;
            return message;
        },//TODO
    }

    static EASTER_EGG = "Vous avez trouvé un easter egg !";

    static SENSEI_MODE_CHANGED(newSenseiMode: boolean) {
        return `Le mode sensei est maintenant ${newSenseiMode ? "activé" : "désactivé"}.`;
    }

    static SENSEI_MODE_NOT_CHANGED(senseiMode: boolean) {
        return `Le mode sensei est déjà ${senseiMode ? "activé" : "désactivé"}.`;
    }

    static NO_PERMISSION(name: string) {
        return `Vous avez besoin de la permission "${name}".`;
    }
}