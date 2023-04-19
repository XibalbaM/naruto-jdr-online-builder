import Environment from "./env/Environment";

//Get the environment to use
const env = process.env.NODE_ENV || 'test';
console.log(`Loading ${env} environment...`);

//Load the environment
let importPath = `./env/${env}.environment.js`;
if (env === 'test') {
    importPath = importPath.replace('.js', '.ts');
}
const config: Environment = (await import(importPath))['default'];
console.log(`Loaded ${env} environment`);

export default config;