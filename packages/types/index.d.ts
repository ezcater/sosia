declare namespace Sosia {
  interface Page {
    body: string;
    css?: string;
  }

  interface ComponentFunc {
    (): React.ReactElement<any>;
  }

  interface Example {
    name: string;
    component: ComponentFunc;
  }

  interface TargetFunc {
    (pages: Page[]): Promise<string[]>;
  }

  interface Target {
    execute: TargetFunc;
  }

  interface SourceFunc {
    (options: any): Example[];
  }

  interface Source {
    execute: SourceFunc;
  }

  interface StringMap<T> {
    [key: string]: T;
  }

  type TargetMap = StringMap<Target>;
  type SourceMap = StringMap<Source>;

  interface Configuration {
    targets: TargetMap;
    sources: SourceMap;
  }
}

declare module 'datauri';

interface MatchImageSnapshotOptions {
  /**
   * Custom config passed to 'pixelmatch'
   */
  customDiffConfig?: {threshold?: number; includeAA?: boolean};
  /**
   * Custom snapshots directory.
   * Absolute path of a directory to keep the snapshot in.
   */
  customSnapshotsDir?: string;
  /**
   * A custom name to give this snapshot. If not provided, one is computed automatically.
   */
  customSnapshotIdentifier?: string;
  /**
   * Removes coloring from the console output, useful if storing the results to a file.
   * Defaults to false.
   */
  noColors?: boolean;
  /**
   * Sets the threshold that would trigger a test failure based on the failureThresholdType selected. This is different
   * to the customDiffConfig.threshold above - the customDiffConfig.threshold is the per pixel failure threshold, whereas
   * this is the failure threshold for the entire comparison.
   * Defaults to 0.
   */
  failureThreshold?: number;
  /**
   * Sets the type of threshold that would trigger a failure.
   * Defaults to 'pixel'.
   */
  failureThresholdType?: 'pixel' | 'percent';
}

declare namespace jest {
  interface Matchers<R> {
    toMatchImageSnapshot(options: MatchImageSnapshotOptions): R;
  }
}
