import {SnapshotState} from 'jest-snapshot';
import hash from 'object-hash';
import {Page} from 'sosia-types';

type NamedPage = Page & {
  name: string;
};

const cacheMap = new Map();

export default ({cachePath, updateSnapshot}: {cachePath: string; updateSnapshot: boolean}) => {
  if (!cacheMap.has(cachePath)) {
    cacheMap.set(cachePath, new SnapshotState(cachePath, {updateSnapshot: updateSnapshot} as any));
  }

  const snapshotState = cacheMap.get(cachePath);

  const match = (page: NamedPage) => {
    const testName = page.name;
    const currentHash = hash(page);

    const {added, updated} = snapshotState;

    // run snapshot to see if there was a match
    const {pass, key} = snapshotState.match({testName, received: currentHash});

    // visual regression should be run on new pages and on pages that have uncommitted changes
    const match = pass && added === snapshotState.added && updated === snapshotState.updated;

    if (!pass) {
      // if there are uncommitted changes, clear the current hash from the cache to ensure
      // a new hash is created when the user updates their snapshots
      snapshotState._dirty = true;
      snapshotState._snapshotData[key] = '__diff__';
    }

    return !match;
  };

  return {
    getChangedPages(pages: NamedPage[]) {
      return pages.filter(match);
    },
    commitCache() {
      snapshotState.save();
      cacheMap.delete(cachePath);
    },
  };
};
