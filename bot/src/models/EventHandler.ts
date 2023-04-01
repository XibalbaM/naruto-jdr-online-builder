export default class EventHandler {
    name: string;
    once: boolean;
    execute: Function;
    constructor(name: string, once: boolean, execute: Function) {
        this.name = name;
        this.once = once;
        this.execute = execute;
    }
}