<template lang="pug">
.app
  h1 Страница с постами
  MyInput.input__search(placeholder="Поиск...", v-model="serchQuery")
  .app__btns
    MyButton.create-btn(@click="showDialog") Создать пост
    .app__sort.post-limits
      .sort__title Кол-во постов на странице:
      MySelect(v-model.number="postsLimitOnPage", :options="postsLimits")
    .app__sort.posts-sort
      .sort__title Сортировать по:
      MySelect(v-model="selectedSort", :options="sortOptions")
  MyDialog(v-model:show="dialogVisible")
    PostForm(@create="createPost")
  PostList(
    :posts="sortedAndSearchedPosts",
    @remove="removePost",
    v-if="!isPostsLoading"
  )
  .posts__loading(v-else)
    h4 Идёт загрузка...
    MyLoading
  PageList(
    :totalPage="totalPage",
    :currentPage="currentPage",
    @changePage="changePage"
  )
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import PageList from "./components/PageList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    PageList,
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
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
        { value: "id", name: "По номеру" },
      ],
      serchQuery: "",
      postsLimitOnPage: 10,
      postsLimits: [
        { value: 5, name: "5" },
        { value: 10, name: "10" },
        { value: 15, name: "15" },
        { value: 20, name: "20" },
        { value: 50, name: "50" },
      ],
      currentPage: 1,
      totalPage: 0,
    };
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id") {
        // сортировка для чисел
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort] - post2[this.selectedSort];
        });
      }
      // сортировка для строк
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.serchQuery.toLowerCase())
      );
    },
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post);
      this.dialogVisible = false;
    },
    removePost(currentPost) {
      this.fetchNextPost(currentPost);
      this.posts = this.posts.filter((post) => post.id !== currentPost.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchNextPost(currentPost) {
      let nextPost = this.posts[this.posts.length - 1].id + 1;
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${nextPost}`
        );
        this.posts.push(data);
      } catch (error) {
        alert("Ошибка");
      }
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.currentPage,
              _limit: this.postsLimitOnPage,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.postsLimitOnPage
        );
        this.posts = response.data;
      } catch (error) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
    changePage(newPage) {
      this.currentPage = newPage;
    },
  },
  watch: {
    postsLimitOnPage() {
      this.currentPage = 1;
      this.fetchPosts();
    },
    currentPage() {
      this.fetchPosts();
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

.app__btns {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  .create-btn {
    font-weight: 600;
    width: 25%;
  }
}

.app__sort {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.input__search {
  margin: 10px 0;
}

.posts__loading {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
