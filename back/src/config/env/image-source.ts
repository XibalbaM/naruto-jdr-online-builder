import ImageSourceConfig from "./ImageSourceConfig.js";

export default [
    new ImageSourceConfig("Discord", /^https:\/\/cdn.discordapp.com\/attachments\/[0-9]*\/[0-9]*\/.*\..*$/),
    new ImageSourceConfig("Imgur", /^https:\/\/i.imgur.com\/.*\..*$/),
    new ImageSourceConfig("Pinterest", /^https:\/\/i.pinimg.com\/.*\..*$/),
    new ImageSourceConfig("Google Drive", /^https:\/\/drive.google.com\/uc\?export=download&id=.*$/, false),
] as ImageSourceConfig[];