let configuration = {} as Partial<Sosia.Configuration>;

export function get(): Partial<Sosia.Configuration> {
  return configuration;
}

export function merge(extra: Partial<Sosia.Configuration>): void {
  Object.assign(configuration, extra);
}

export function reset(replacementConfig = {}): void {
  configuration = {};
  merge(replacementConfig);
}
