import {Component, computed, input} from '@angular/core';
import MarkdownIt, {StateBlock, StateInline} from "markdown-it";

@Component({
    selector: 'app-markdown',
    standalone: true,
    imports: [],
    templateUrl: './markdown.component.html',
    styleUrl: './markdown.component.scss'
})
export class MarkdownComponent {

    markdown = input.required<string>();
    html = computed(() => markdownIt.render(this.markdown()));
}

const markdownIt = MarkdownIt({
    breaks: true,
    linkify: true
}).use(markdownUnderline).use(markdownSmall);

function markdownUnderline(md: MarkdownIt) {
    function underline(state: StateInline): boolean {
        for (let i = 0; i < state.delimiters.length; i++) {
            let startDelim = state.delimiters[i];

            if (startDelim.marker !== 0x5F /* _ */ || startDelim.end === -1) {
                continue;
            }

            let token = state.tokens[startDelim.token];
            token.type = 'u_open';
            token.tag = 'u';
            token.nesting = 1;
            token.markup = '__';
            token.content = '';

            token = state.tokens[state.delimiters[startDelim.end].token];
            token.type = 'u_close';
            token.tag = 'u';
            token.nesting = -1;
            token.markup = '__';
            token.content = '';
        }
        return true;
    }

    md.inline.ruler2.after('emphasis', 'underline', underline);
}

function markdownSmall(md: MarkdownIt) {
    function small(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
        if (silent) {
            return true
        }

        let pos = state.bMarks[startLine] + state.tShift[startLine]
        let max = state.eMarks[startLine]

        if (state.sCount[startLine] - state.blkIndent >= 4) {
            return false
        }

        if (state.src.charCodeAt(pos) !== 0x2D/* - */ ||
            state.src.charCodeAt(++pos) !== 0x23/* # */ ||
            state.src.charCodeAt(++pos) !== 0x20/* SPACE */ ||
            pos > max) {
            return false
        }

        max = state.skipSpacesBack(max, pos)
        const tmp = state.skipCharsBack(max, 0x23, pos) // #
        if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20) {
            max = tmp
        }

        state.line = startLine + 1

        const token_o = state.push('small_open', 'small', 1)
        token_o.markup = '-# '
        token_o.map = [startLine, state.line]

        const token_i = state.push('inline', '', 0)
        token_i.content = state.src.slice(pos, max).trim()
        token_i.map = [startLine, state.line]
        token_i.children = []

        const token_c = state.push('small_close', 'small', -1)
        token_c.markup = '-# '

        return true
    }

    md.block.ruler.after('heading', 'small', small);
}