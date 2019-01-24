# Sosia

Sosia is a visual regression testing tool, powered by component snapshots. Sosia compares the visual appearance of components before and after a change to ensure consistent styling of your application across responsive breakpoints and across various browsers.

## Why use Sosia?

A stand-out difference between Sosia and many other visual regression testing tools is that Sosia integrates with the jest test runner, allowing access to jest's ecosystem. Use conditional logic to vary styling of your application? Sosia can provide you code coverage for that logic, while providing you images of your component in various states to validate the correctness of your application.

Say goodbye to verbose dom snapshots that are hard to understand when they fail. Sosia uses [`jest-image-snapshot`](https://www.npmjs.com/package/jest-image-snapshot) to generate before and after images alongside an overlay highlighting the differences.

## Installation

```term
npm install sosia --save-dev
```

## Getting started

Sosia uses example files to generate snapshots of your components. If you have an existing source of component examples, for example, markdown documentation for your components, Sosia can be configured to automatically generate snapshots based on this source.

Additionally, we need to provide Sosia an environment to render your components. Here we can tell Sosia what browser, device, and/or screen size to target.

```js
import {configure} from 'sosia';
import {PuppeteerBrowserTarget} from 'sosia-puppeteer';
import {MarkdownSource} from 'sosia-markdown';

configure({
  targets: {
    'chrome-desktop': new PuppeteerBrowserTarget({
      width: 1024,
      height: 768,
    }),
  },
  sources: {
    documentation: new MarkdownSource(),
  },
});
```

In the above setup:

- The `MarkdownSource` plugin is used to feed Sosia with variations of your components discovered within your markdown files in documentation.
- The `PuppeteerBrowserTarget` plugin is used as the runtime for your components, rendering the component in headless chrome to generate the snapshot image.

### MarkdownSource

The `MarkdownSource` plugin allows Sosia to generate a visual regression tests for based on markdown examples. Each JSX code block in a markdown file will used to generate a snapshot, and the closest heading will be used to label the snapshot.

In the following example, the markdown-based documentation show below is used to feed a unit test with components to snapshot. In this example as single snapshot is generated for the `MyComponent` component, and that snapshot is labelled using the title `My Component` from the markdown heading.

````markdown
### My Component

This component is used to do a thing

```jsx
<MyComponent myProp={myValue}>Stuff here</MyComponent>
```
````

```jsx
import {visualSnapshots} from 'sosia';
import MyComponent from '../MyComponent';
import markdown from '../MyComponent.md';

const scope = {MyComponent};

describe('My Component', () => {
  visualSnapshots({markdown, scope});
});
```

In the test above, the raw markdown string for the `MyComponent` documentation is imported to be passed to Sosia. In order for Sosia to know about the `MyComponent` component, a `scope` option is provided with a reference to the component defintion.

Note: In order to load markdown string using module import syntax, the [`jest-raw-loader`](https://github.com/keplersj/jest-raw-loader) is required. This can be loaded using the following [jest transform configuration](https://jestjs.io/docs/en/configuration.html#transform-object-string-string):

```
"jest": {
  "transform": {
    "^.+\\.md?$": "jest-raw-loader"
  }
}
```

### PuppeteerBrowserTarget

The `PuppeteerBrowserTarget` plugin is used as the runtime for your components, rendering the component in headless chrome to generate the snapshot image.

In order to use this Sosia browser target, jest needs some addition configuration [to support puppeteer](https://github.com/GoogleChrome/puppeteer/issues/2754).

Add "json" to the `moduleFileExtensions` entry in the jest property in your jest configuration file.

```
"jest": {
  "moduleFileExtensions": ["json"]
}
```
