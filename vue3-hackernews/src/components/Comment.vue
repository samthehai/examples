<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
      {{ timeAgo(comment.time) }}
    </div>
    <div class="text" v-html="comment.text"></div>
    <div
      class="toggle"
      :class="{ open }"
      v-if="comment.kids && comment.kids.length"
    >
      <a @click="open = !open">{{
        open ? "[-]" : "[+] " + comment.kids.length + "replies collapsed"
      }}</a>
    </div>
    <ul class="comment-children" v-show="open">
      <comment v-for="id in comment.kids" :key="id" :id="id"></comment>
    </ul>
  </li>
</template>

<script>
import timeAgo from "../utils/timeAgo";

export default {
  name: "comment",
  props: ["id"],
  data() {
    return {
      open: true,
    };
  },
  computed: {
    comment() {
      return this.$store.state.items[this.id];
    },
  },
  methods: {
    timeAgo,
  },
};
</script>

<style lang="scss" scoped>
</style>
