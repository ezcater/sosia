import path from 'path';

export const resolveCachePathFromTestPath = (testPath: string) => {
  return path.join(
    path.join(path.dirname(testPath), '__image_snapshots__'),
    path.basename(testPath, path.extname(testPath)) + '-snap.cache'
  );
};
