import { fetchIdsByType, fetchItems } from "../api";

export default {
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit("SET_ACTIVE_TYPE", { type });
    return fetchIdsByType(type)
      .then((ids) => commit("SET_LIST", { type, ids }))
      .then(() => dispatch("ENSURE_ACTIVE_ITEMS"));
  },
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch("FETCH_ITEMS", {
      ids: getters.activeIds,
    });
  },
  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    const now = Date.now();
    ids = ids.filter((id) => {
      const item = state.items[id];
      if (!item) {
        return true;
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true;
      }
      return false;
    });
    if (ids.length) {
      return fetchItems(ids).then((items) => commit("SET_ITEMS", { items }));
    } else {
      return Promise.resolve();
    }
  },
};
