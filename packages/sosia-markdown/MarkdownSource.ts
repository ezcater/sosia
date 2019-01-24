import mdToAst from 'markdown-ast';
import {createElement, ReactElement} from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface Component {
  (): ReactElement<any> | null;
}

interface Example {
  name: string;
  component: Component;
}

export default class MarkdownSource {
  execute({markdown, scope}: {markdown: string; scope: object}): Example[] {
    const ast = mdToAst(markdown);
    let title: string;

    return ast.reduce(
      (ex, node) => {
        switch (node.type) {
          case 'title':
            title = (node.block[0] as any).text;
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
