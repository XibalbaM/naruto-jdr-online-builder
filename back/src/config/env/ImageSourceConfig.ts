export default class ImageSourceConfig {
    name: string;
    regex: RegExp;
    verifyFileExtension: boolean = true;

    constructor(name: string, regex: RegExp, verifyFileExtension: boolean = true) {
        this.name = name;
        this.regex = regex;
        this.verifyFileExtension = verifyFileExtension;
    }
}