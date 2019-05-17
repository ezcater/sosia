import {render} from 'react-dom';
import {renderToStaticMarkup} from 'react-dom/server';
import {toMatchImageSnapshot} from 'jest-image-snapshot';
import {get} from './configuration';
import {Example, Page, Target} from 'sosia-types';
import trackChanges from './change-tracker';
import {resolveCachePathFromTestPath} from './utils';

expect.extend({toMatchImageSnapshot});

const generateExamples = (options: any): Example[] => {
  const {sources} = get();

  if (!sources) throw new Error('Please configure an example source via `configure`.');

  return Object.values(sources).reduce(
    (list, source) => {
      return [...list, ...source.execute(options)];
    },
    [] as Example[]
  );
};

const extractCss = (container: ParentNode): string => {
  return Array.from(container.querySelectorAll('style'))
    .map(el => {
      if (el.innerHTML) return el.innerHTML;
      if (!el.sheet) return '';

      const sheet = el.sheet as any;
      const rules = sheet.cssRules as CSSRuleList;

      return Array.from(rules)
        .map(r => r.cssText)
        .join('\n');
    })
    .join('\n');
};

const buildPage = (example: Example): Page & {name: string} => {
  const container = document.createElement('div');
  const output = example.component();

  render(output, container);

  return {
    body: renderToStaticMarkup(output),
    css: extractCss(document),
    name: example.name,
  };
};

const getName = (targetName: string, exampleName: string) =>
  `${targetName} ${exampleName}`.replace(/[^\w]+/gu, '-').toLowerCase();

const takeSnapshots = async ({target, pages}: {target: Target; pages: Page[]}) => {
  return await target.execute(pages);
};

const runTests = (testPath: string, examples: Example[]): void => {
  const {targets} = get();

  if (!targets) throw new Error('Please configure at least one browser target via `configure`.');

  const pages = examples.map(buildPage);
  const cachePath = resolveCachePathFromTestPath(testPath);
  const changeTracker = trackChanges({cachePath});

  for (const [targetName, target] of Object.entries(targets)) {
    const changedPages = changeTracker.getChangedPages(pages);
    const promises = takeSnapshots({target, pages: changedPages});

    describe(`snapshot: ${targetName}`, () => {
      pages.forEach(page => {
        const customSnapshotIdentifier = getName(targetName, page.name);

        test(`${page.name}`, async () => {
          const i = changedPages.indexOf(page);
          if (i === -1) return;
          const images = await promises;
          const image = images[i];
          expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier,
          });
        });
      });
    });

    afterAll(() => {
      changeTracker.commitCache();
    });
  }
};

export function toMatchVisualSnapshot(this: {testPath: string}, received: any) {
  const {testPath} = this;
  const examples = generateExamples(received);
  runTests(testPath, examples);
  return {pass: true, message: () => ''};
}

export const runSnapshots = (options: any): void => {
  let expectation = expect(options) as any;

  if (!('toMatchVisualSnapshot' in expectation)) {
    expect.extend({toMatchVisualSnapshot: toMatchVisualSnapshot as any});
    expectation = expect(options);
  }

  expectation.toMatchVisualSnapshot();
};
