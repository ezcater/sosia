import {SnapshotState} from 'jest-snapshot';
import hash from 'object-hash';
import {Page} from 'sosia-types';

type NamedPage = Page & {
  name: string;
};

const cacheMap = new Map();

export default ({cachePath}: {cachePath: string}) => {
  if (!cacheMap.has(cachePath)) {
    cacheMap.set(cachePath, new SnapshotState(cachePath, {updateSnapshot: 'all'} as any));
  }

  const snapshotState = cacheMap.get(cachePath);

  const match = (page: NamedPage) => {
    const testName = page.name;
    const currentHash = hash(page);

    // to use jest to detect changes, we need to tell jest NOT to update snapshots
    Object.assign(snapshotState, {_updateSnapshot: 'none'});

    // run snapshot to see if there was a match
    const match = snapshotState.match({testName, received: currentHash});

    // reset back to allow updating the state and reset internal counters
    Object.assign(snapshotState, {_updateSnapshot: 'all', _counters: new Map()});

    // if the hash has changed, we can update it
    if (!match.pass) {
      // now rerun to ensure new has is written
      snapshotState.match({testName, received: currentHash});
      return true;
    }

    return false;
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
