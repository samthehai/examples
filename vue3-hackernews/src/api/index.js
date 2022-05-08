import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue } from "firebase/database";

const logRequests = !!import.meta.env.VITE_DEBUG_API;

const app = initializeApp({
  databaseURL: "https://hacker-news.firebaseio.com",
});

const api = ref(getDatabase(app), "/v0");

if (api.onServer) {
  warmCache();
}

function warmCache() {
  fetchItems((api.cachedIds.top || []).slice(0, 30));
  setTimeout(warmCache, 1000 * 60 * 15);
}

function fetch(childKey) {
  logRequests && console.log(`fetching ${childKey}...`);
  const cache = api.cachedItems;
  if (cache && cache.has(childKey)) {
    logRequests && console.log(`cache hit for ${childKey}.`);
    return Promise.resolve(cache.get(childKey));
  } else {
    return new Promise((resolve, reject) => {
      get(child(api, childKey)).then((snapshot) => {
        const val = snapshot.val();
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now();
        cache && cache.set(childKey, val);
        logRequests && console.log(`fetched ${childKey}.`);
        resolve(val);
      }, reject);
    });
  }
}

export function fetchIdsByType(type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`);
}

export function fetchItem(id) {
  return fetch(`item/${id}`);
}

export function fetchItems(ids) {
  return Promise.all(ids.map((id) => fetchItem(id)));
}

export function fetchUser(id) {
  return fetch(`user/${id}`);
}

export function watchList(type, cb) {
  let first = true;

  const ref = child(api, `${type}stories`);

  const handler = (snapshot) => {
    if (first) {
      first = false;
    } else {
      cb(snapshot.val());
    }
  };

  const unsubscriber = onValue(ref, handler);

  return unsubscriber;
}
