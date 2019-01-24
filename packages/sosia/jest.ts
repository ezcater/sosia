import {render} from 'react-dom';
import {get} from './configuration';
import {toMatchImageSnapshot} from 'jest-image-snapshot';

expect.extend({toMatchImageSnapshot});

const generateExamples = (options: any): Sosia.Example[] => {
  const {sources} = get();

  if (!sources) throw new Error('Please configure an example source via `configure`.');

  return Object.values(sources).reduce(
    (list, source) => {
      return [...list, ...source.execute(options)];
    },
    [] as Sosia.Example[]
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

const buildPage = (example: Sosia.Example): Sosia.Page => {
  const container = document.createElement('div');

  render(example.component(), container);

  return {
    body: container.innerHTML,
    css: extractCss(document),
  };
};

const takeSnapshots = async ({
  target,
  examples,
}: {
  target: Sosia.Target;
  examples: Sosia.Example[];
}) => {
  const pages = examples.map(buildPage);
  return await target.execute(pages);
};

const runTests = (examples: Sosia.Example[]): void => {
  const {targets} = get();

  if (!targets) throw new Error('Please configure at least one browser target via `configure`.');

  for (const [targetName, target] of Object.entries(targets)) {
    const promises = takeSnapshots({target, examples});

    describe(`snapshot: ${targetName}`, () => {
      examples.forEach((example, i) => {
        const customSnapshotIdentifier = `${targetName} ${example.name}`
          .split(' ')
          .join('-')
          .toLowerCase();

        test(`${example.name}`, async () => {
          const images = await promises;
          const image = images[i];
          expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier,
          });
        });
      });
    });
  }
};

export const runSnapshots = (options: any): void => {
  runTests(generateExamples(options));
};
