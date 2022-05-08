<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a :href="item.url" target="_blank" class="title">
          {{ item.title }}
        </a>
        <span v-if="item.url" class="host"> ({{ host(item.url) }}) </span>
        <p class="meta">
          {{ item.score }} points by
          <span>{{ item.by }}</span>
          {{ timeAgo(item.time) }} |
          <span class="item-view-comments-header">
            {{
              item.kids ? item.descendants + " comments" : "No comments yet."
            }}
          </span>
        </p>
      </div>
      <div class="item-view-comments">
        <ul v-if="!loading" class="comment-children">
          <comment v-for="id in item.kids" :key="id" :id="id"></comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
import host from "../utils/host";
import timeAgo from "../utils/timeAgo";

export default {
  name: "item-view",
  components: { Comment },
  data: () => ({
    loading: false,
  }),
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    },
  },
  asyncData({
    store,
    route: {
      params: { id },
    },
  }) {
    return store.dispatch("FETCH_ITEMS", { ids: [id] });
  },
  title() {
    return this.item.title;
  },
  beforeMount() {
    this.fetchComments();
  },
  watch: {
    item: "fetchComments",
  },
  methods: {
    host,
    timeAgo,
    fetchComments() {
      if (!this.item || !this.item.kids) {
        return;
      }

      this.loading = true;
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false;
      });
    },
  },
};

const fetchComments = (store, item) => {
  if (item && item.kids) {
    return store
      .dispatch("FETCH_ITEMS", {
        ids: item.kids,
      })
      .then(() =>
        Promise.all(
          item.kids.map((id) => {
            return fetchComments(store, store.state.items[id]);
          })
        )
      );
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;

  text-decoration: none;
  color: #000000;

  &:hover {
    color: #ff6600;
  }
}

.meta {
  color: #828282;
  font-size: 13px;

  &__by {
    margin-left: 5px;
  }

  &__time {
    margin-left: 5px;
  }

  &__comments-link {
    a {
      text-decoration: none;
      color: #828282;
    }
  }
}
</style>
