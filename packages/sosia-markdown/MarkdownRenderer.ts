import {createElement} from 'react';
import {LiveProvider, LivePreview} from 'react-live';

export default ({code, scope}: {code: string; scope: object}) =>
  createElement(LiveProvider, {code, scope}, createElement(LivePreview));
