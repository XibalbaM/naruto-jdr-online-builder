import ImageSourceConfig from "./ImageSourceConfig.js";

export default [
    new ImageSourceConfig("Discord", /^https:\/\/cdn.discordapp.com\/attachments\/[0-9]*\/[0-9]*\/.*\..*$/)
] as ImageSourceConfig[];