<template>
  <v-app>
    <v-main>
      <v-component :is="layout">
        <router-view />
      </v-component>
    </v-main>
  </v-app>
</template>

<script>
const default_layout = "default";

export default {
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
html * {
  font-family: "Quicksand", sans-serif;
}
</style>