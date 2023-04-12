import nodemailer from "nodemailer";

import config from "../config/env.js";

const transporter = nodemailer.createTransport(config.loginEmail.transport);

const connectionTemplate = (connectionToken: string) => {
    return `Link : ${config.loginUrl}${connectionToken}`;
}

const accountCreationTemplate = (connectionToken: string) => {
    return `Link : ${config.loginUrl}${connectionToken}`;
}

export async function sendConnectionEmail(to: string, connectionToken: string, isRegistration: boolean) {

    console.log(`Sending connection email to ${to} with token ${connectionToken} as ${isRegistration ? "registration" : "connection"}`);

    const info = await transporter.sendMail({
        from: config.loginEmail.username,
        to: to,
        subject: isRegistration ? "Inscription" : "Connexion",
        html: isRegistration ? accountCreationTemplate(connectionToken) : connectionTemplate(connectionToken)
    });

    console.log("Message sent");
    console.log("Info : " + info);
}