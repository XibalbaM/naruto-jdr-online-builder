import Environment from "./env/Environment.js";

const env = process.env.NODE_ENV || "test";
console.log(`Loading ${env} environment...`);
let importPath = `./env/${env}.env.js`;
if (env === "test") {
    importPath = importPath.replace(".js", ".ts");
    process.chdir("src");
}
const config: Environment = (await import(importPath))["default"];

export default config;