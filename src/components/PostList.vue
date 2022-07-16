<template lang="pug">
.posts
  h4(v-if="posts.length > 0") Список постов
  h4(v-else, style="color: red") Список постов пуст
  .posts__list(:class="{ intwocolumns: columnsShow == '2' }")
    transition-group(name="posts-list")
      PostItem(
        v-for="post in posts",
        :key="post.id",
        :post="post",
        @remove="$emit('remove', post)",
        :columnsShow="columnsShow"
      )
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
    columnsShow: {
      type: [String, Number],
      default: "1",
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

.intwocolumns {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-left: -2%;
}
</style>