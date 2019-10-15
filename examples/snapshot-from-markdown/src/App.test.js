import {visualSnapshots} from 'sosia';
import App from './App';
import markdown from './super-important-form.md';

describe('App', () => {
  visualSnapshots({
    markdown,
    scope: {App},
  });
});
