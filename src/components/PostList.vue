<template lang="pug">
.posts
  .posts-list(v-if="posts.length > 0")
    h4 Список постов
    PostItem(
      v-for="post in posts",
      :key="post.id",
      :post="post",
      @remove="$emit('remove', post)"
    )
  .posts-list(v-else)
    h4(style="color: red") Список постов пуст
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>