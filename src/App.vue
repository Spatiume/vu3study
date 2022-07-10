<template lang="pug">
.container
  NavBar
  router-view.content
  NavBar.footer
</template>
<script>
import NavBar from "./components/NavBar.vue"
export default {
  components:{
    NavBar
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.content {
  padding: 20px;
}

.footer{
  background: #003336;
}
</style>