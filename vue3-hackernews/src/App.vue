<template>
  <div id="app">
    <header class="header">
      <Navigator :navigators="navigators"></Navigator>
    </header>
    <router-view v-slot="{ Component }">
      <component :is="Component" class="view" />
    </router-view>
  </div>
</template>

<script>
import Navigator from "./components/Navigator.vue";

export default {
  name: "app",
  components: {
    Navigator,
  },
  computed: {
    navigators() {
      return [
        { to: "/top", text: "Hacker News" },
        { to: "/new", text: "New" },
        { to: "/show", text: "Show" },
        { to: "/ask", text: "Ask" },
        { to: "/job", text: "Jobs" },
      ];
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Verdana, Geneva, sans-serif;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  color: #34495e;
  overflow-y: scroll;
}

#app {
  width: 85%;
  min-width: 796px;
  margin: 0 auto;

  @media only screen and (min-width: 300px) and (max-width: 750px) {
    padding: 0;
    margin: 0;
    width: 100%;
    min-width: 0;
    -webkit-text-size-adjust: none;
  }
}

.header {
  background-color: #ff6600;
  top: 0;
  left: 0;
  right: 0;
}

.view {
  background-color: rgb(246, 246, 239);
  margin: 0 auto;
}

ul,
li {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: #828282;

  &:hover {
    text-decoration: underline;
  }
}
</style>
