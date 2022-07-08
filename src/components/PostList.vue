<template lang="pug">
.posts
  .posts__list(v-if="posts.length > 0")
    h4 Список постов
    transition-group(name="posts-list")
      PostItem(
        v-for="post in posts",
        :key="post.id",
        :post="post",
        @remove="$emit('remove', post)"
      )
  .posts__list(v-else)
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
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.5s ease;
}
.posts-list-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.posts-list-move {
  transition: transform 0.5s ease;
}
</style>