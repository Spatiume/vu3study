<template lang="pug">
.app-container.container
  NavBar
  router-view.content
  NavBar.footer
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 20px;
  flex: 1;
}

.footer {
  background: #003336;
}
</style>