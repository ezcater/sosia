import {visualSnapshots} from 'sosia';
import * as Recipe from '@ezcater/recipe';
import App from './App';

describe('App', () => {
  visualSnapshots({
    markdown: `
### Super important form
\`\`\`jsx
  <App/ >
\`\`\`
`,
    scope: {
      ...Recipe,
      App,
    },
  });
});
