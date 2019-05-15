import mdToAst from 'markdown-ast';
import {createElement} from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import {Example} from 'sosia-types';

export default class MarkdownSource {
  execute({markdown, scope}: {markdown: string; scope: object}): Example[] {
    const ast = mdToAst(markdown);
    let title: string;

    return ast.reduce(
      (ex, node) => {
        switch (node.type) {
          case 'title':
            const block = node.block[0] as any;
            title = block && block.text;
            break;
          case 'codeBlock':
            ex.push({
              name: title,
              component: () => createElement(MarkdownRenderer, {code: node.code, scope}),
            });
            title = '';
            break;
        }
        return ex;
      },
      [] as Example[]
    );
  }
}
