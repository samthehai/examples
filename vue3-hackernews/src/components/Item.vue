<template>
  <li class="news-item">
    <p class="news-item__rank">{{ rank }}</p>
    <div class="news-item__content">
      <div class="title">
        <template v-if="item.url">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
            class="title__title"
            >{{ item.title }}</a
          >
          <span class="title__host"> ({{ host(item.url) }})</span>
        </template>
        <template v-else>
          <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
        </template>
      </div>
      <div class="meta">
        <span v-if="item.score" class="meta__score"
          >{{ item.score }} points</span
        >
        <span v-if="item.by" class="meta__by">by {{ item.by }}</span>
        <span v-if="item.time" class="meta__time">{{
          timeAgo(item.time)
        }}</span>
        <span class="meta__comments-link">
          |
          <router-link :to="'/item/' + item.id"
            >{{ item.descendants }} comments</router-link
          >
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import host from "../utils/host";
import timeAgo from "../utils/timeAgo";

export default {
  name: "news-item",
  props: ["item", "rank"],
  computed: {
    stringifiedItem() {
      return JSON.stringify(this.item);
    },
  },
  methods: {
    host,
    timeAgo,
  },
};
</script>

<style lang="scss" scoped>
.news-item {
  display: flex;
  align-items: center;

  overflow-wrap: break-word;

  &__rank {
    border: #828282 2px solid;
    font-size: 20px;
  }

  &__content {
    margin-left: 5px;
  }
}

.title {
  &__title {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: #000000;

    &:hover {
      color: #ff6600;
    }
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
