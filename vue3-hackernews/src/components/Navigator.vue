<template>
  <nav class="nav">
    <router-link to="/" exact>
      <img class="logo" src="/y18.gif" alt="logo" />
    </router-link>
    <template v-for="(item, index) in navigators" :key="index">
      <span v-if="index > 1"> | </span>
      <router-link v-if="index === 0" :to="item.to" class="hn-name">{{
        item.text
      }}</router-link>
      <router-link v-else :to="item.to">{{ item.text }}</router-link>
    </template>
  </nav>
</template>

<script>
export default {
  name: "navigator",
  props: ["navigators"],
};
</script>

<style lang="scss" scoped>
nav {
  box-sizing: border-box;
  font-size: 13px;
  margin: 0px auto;
  padding: 10px 0;

  a {
    color: rgba(0, 0, 0, 0.8);
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: #fff;
    }

    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }
  }
}

.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.hn-name {
  font-size: 16px;
  margin-right: 10px;
  font-weight: 600;
}
</style>
