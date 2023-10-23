import {MarkedOptions, MarkedRenderer} from "ngx-markdown";

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();
    return {
        renderer: renderer,
        gfm: true,
        breaks: true,
    };
}