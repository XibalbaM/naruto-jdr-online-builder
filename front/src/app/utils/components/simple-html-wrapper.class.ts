import {Injectable, Input} from "@angular/core";

@Injectable()
export default abstract class SimpleHtmlWrapper {
    @Input() class!: string;
}