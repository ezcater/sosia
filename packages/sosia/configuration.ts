import {Configuration} from 'sosia-types';

let configuration = {} as Partial<Configuration>;

export function get(): Partial<Configuration> {
  return configuration;
}

export function merge(extra: Partial<Configuration>): void {
  Object.assign(configuration, extra);
}

export function reset(replacementConfig = {}): void {
  configuration = {};
  merge(replacementConfig);
}
