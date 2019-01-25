import {ReactElement} from 'react';

import './third-party';

export interface Page {
  body: string;
  css?: string;
}

interface ComponentFunc {
  (): ReactElement<any>;
}

export interface Example {
  name: string;
  component: ComponentFunc;
}

interface TargetFunc {
  (pages: Page[]): Promise<string[]>;
}

export interface Target {
  execute: TargetFunc;
}

interface SourceFunc {
  (options: any): Example[];
}

export interface Source {
  execute: SourceFunc;
}

interface StringMap<T> {
  [key: string]: T;
}

type TargetMap = StringMap<Target>;
type SourceMap = StringMap<Source>;

export interface Configuration {
  targets: TargetMap;
  sources: SourceMap;
}
