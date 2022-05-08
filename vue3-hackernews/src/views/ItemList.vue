<template>
  <div class="news-view">
    <ul class="news-view__list news-list" v-if="displayedPage > 0">
      <Item
        v-for="(item, index) in displayedItems"
        :key="item.id"
        :item="item"
        :rank="index + 1"
        class="news-list__item"
      />
    </ul>
    <div v-else class="news-list--empty">There is no item...</div>
  </div>
</template>

<script>
import { watchList } from "../api";
import Item from "../components/Item.vue";

export default {
  name: "item-list",
  components: {
    Item,
  },
  props: {
    type: String,
  },
  data() {
    return {
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems,
    };
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1;
    },
  },
  beforeMount() {
    this.loadItems(this.page);
    // watch the current list for realtime updates
    this.unwatchList = watchList(this.type, (ids) => {
      this.$store.commit("SET_LIST", { type: this.type, ids });
      this.$store.dispatch("ENSURE_ACTIVE_ITEMS").then(() => {
        this.displayedItems = this.$store.getters.activeItems;
      });
    });
  },
  beforeUnmount() {
    this.unwatchList();
  },
  watch: {
    page(to) {
      this.loadItems(to);
    },
  },
  methods: {
    loadItems(to = this.page) {
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: this.type,
        })
        .then(() => {
          if (this.page < 0) {
            this.$router.replace(`/${this.type}/1`);
            return;
          }
          this.displayedPage = to;
          this.displayedItems = this.$store.getters.activeItems;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.news-view {
  &__list {
    margin: 40px 0;
  }
}

.news-list {
  border-radius: 2px;
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;

  &--empty {
    text-align: center;
  }

  &__item {
    &:nth-child(n + 1) {
      margin-top: 5px;
    }
  }
}
</style>
