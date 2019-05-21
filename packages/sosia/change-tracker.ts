import {SnapshotState} from 'jest-snapshot';
import hash from 'object-hash';
import {Page} from 'sosia-types';

type NamedPage = Page & {
  name: string;
};

const cacheMap = new Map();
const keyMap = new Map();

export default ({cachePath, updateSnapshot}: {cachePath: string; updateSnapshot: boolean}) => {
  if (!cacheMap.has(cachePath)) {
    cacheMap.set(cachePath, new SnapshotState(cachePath, {updateSnapshot: updateSnapshot} as any));
  }

  const snapshotState = cacheMap.get(cachePath);

  const markAsDirty = (key: string) => {
    snapshotState._dirty = true;
    snapshotState._snapshotData[key] = '__diff__';
  };

  const match = (page: NamedPage) => {
    const testName = page.name;
    const currentHash = hash(page);

    const {added, updated} = snapshotState;

    // run snapshot to see if there was a match
    const {pass, key} = snapshotState.match({testName, received: currentHash});

    keyMap.set(testName, key);

    // visual regression should be run on new pages and on pages that have uncommitted changes
    const match = pass && added === snapshotState.added && updated === snapshotState.updated;

    if (!pass) {
      // if there are uncommitted changes, clear the current hash from the cache to ensure
      // a new hash is created when the user updates their snapshots
      markAsDirty(key);
    }

    return !match;
  };

  return {
    getChangedPages(pages: NamedPage[]) {
      return pages.filter(match);
    },
    markAsDirty(page: NamedPage) {
      const key = keyMap.get(page.name);
      if (key) markAsDirty(key);
    },
    commitCache() {
      snapshotState.save();
      cacheMap.delete(cachePath);
      keyMap.clear();
    },
  };
};
