import {RuleInline} from "markdown-it/lib/parser_inline";
import MarkdownIt from "markdown-it";

export function markdownPluginUnderline(md: MarkdownIt) {
    console.log('markdownPluginUnderline', md);
    const delimiter = '_';
    const tokenize: RuleInline = (state, silent) => {
        console.log('tokenize', state);
        return true;
    };

    md.inline.ruler.before('emphasis', 'underline', tokenize);
    console.log('md', md.inline.ruler.getRules("underline"));
    console.log('md', md.inline.ruler2.getRules("underline"));
}