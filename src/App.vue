<template lang="pug">
.app
  h1 Страница с постами
  MyButton.create-btn(@click="showDialog") Создать пост
  MyDialog(v-model:show="dialogVisible")
    PostForm(@create="createPost")
  PostList(:posts="posts", @remove="removePost", v-if="!isPostsLoading")
  .posts__loading(v-else)
    h4 Идёт загрузка...
    MyLoading
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Javascript", body: "Описание поста" },
        { id: 2, title: "Javascript 2", body: "Описание поста 2" },
        { id: 3, title: "Javascript 3", body: "Описание поста 3" },
        { id: 4, title: "Javascript 3", body: "Описание поста 4" },
      ],
      dialogVisible: false,
      isPostsLoading: true,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(currentPost) {
      this.posts = this.posts.filter((post) => post.id !== currentPost.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = data;
      } catch (error) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.create-btn {
  margin: 10px 0;
  font-weight: 600;
  width: 25%;
}

.posts__loading {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
