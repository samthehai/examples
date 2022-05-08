import { h } from "vue";
import ItemList from "./ItemList.vue";

const camelize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function createListView(type) {
  return {
    name: `${type}-stories-vue`,
    title: camelize(type),
    asyncData({ store }) {
      return store.dispatch("FETCH_LIST_DATA", { type });
    },
    render() {
      return h(ItemList, { type });
    },
  };
}
