import nodemailer from "nodemailer";

import config from "../config/env.js";

const transporter = nodemailer.createTransport(config.loginEmail.transport);

export async function sendConnectionEmail(to: string, connectionToken: string, isRegistration: boolean) {

    console.log(`Sending connection email to ${to} with token ${connectionToken} as ${isRegistration ? "registration" : "connection"}`);

    const info = await transporter.sendMail({
        from: config.loginEmail.username,
        to: to,
        subject: isRegistration ? "Inscription" : "Connexion",
        text: "Pour vous " + (isRegistration ? "inscrire" : "connecter") + ", cliquez sur ce lien: " + config.loginUrl + connectionToken + "\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce mail."
    });

    console.log("Message sent");
    console.log("Info : " + info);
}