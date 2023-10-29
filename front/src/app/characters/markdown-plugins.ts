import MarkdownIt from "markdown-it";
import {RenderRule} from "markdown-it/lib/renderer";

export function markdownPluginUnderline(md: MarkdownIt) {
    const renderEm: RenderRule = (tokens, idx, opts, env, slf) => {
        const token = tokens[idx];
        if (token.markup === '__') {
            token.tag = 'u';
        }
        return slf.renderToken(tokens, idx, opts);
    }

    md.renderer.rules["strong_open"] = renderEm;
    md.renderer.rules["strong_close"] = renderEm;
}