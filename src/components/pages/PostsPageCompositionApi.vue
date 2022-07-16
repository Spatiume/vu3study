<template lang="pug">
.posts-page
  MyInput.input__search(placeholder="Поиск...", v-model="searchQuery")
  .app__btns
    MyButton.create-btn(@click="showDialog") Создать пост
    .app__sort.posts-sort
      .sort__title Сортировать по:
      MySelect(v-model="selectedSort", :options="sortOptions")
  .app__btns
    .columns__show
      div Показывать:
      MyRadio(
        :options="columnsShowOptions",
        :radioName="columnsShow",
        :radioDefault="columnsShow",
        v-model="columnsShow"
      )
  MyDialog(v-model:show="dialogVisible")
    PostForm(@create="createPost")

  PostList(
    :posts="sortedAndSearchedPosts",
    @remove="removePost",
    :columnsShow="columnsShow"
  )
  .posts__loading(v-if="isPostsLoading")
    h4 Идёт загрузка...
    MyLoading
  .observer(
    v-intersection="(loadMorePosts)",
    v-show="!isPostsLoading && paginationType == 'dinamic'"
  ) Мы загрузили всё что могли...
</template>

<script>
import PostForm from "../PostForm.vue";
import PostList from "../PostList.vue";
import PageList from "../PageList.vue";
import axios from "axios";
import { ref } from "vue";

//hooks
import usePosts from "./../../hooks/usePosts";
import useSortedPosts from "./../../hooks/useSortedPosts";
import useSortedAndSearchedPosts from "./../../hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm,
    PostList,
    PageList,
  },
  data() {
    return {
      dialogVisible: false,
      columnsShow: "1",
      columnsShowOptions: [
        { value: "1", title: "В одну колонику" },
        { value: "2", title: "В две колонки" },
      ],
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
        { value: "id", name: "По номеру" },
      ],
      postsLimitOnPage: 10,
      postsLimits: [
        { value: 5, name: "5" },
        { value: 10, name: "10" },
        { value: 15, name: "15" },
        { value: 20, name: "20" },
        { value: 50, name: "50" },
      ],
      totalPage: 10,
      dinamicPage: 1,
      paginationType: "dinamic",
      paginationTypeOptions: [
        { value: "dinamic", title: "Динамично" },
        { value: "perpage", title: "Постранично" },
      ],
    };
  },
  computed: {},
  methods: {
    createPost(post) {
      this.posts.unshift(post);
      this.dialogVisible = false;
    },
    removePost(currentPost) {
      if (this.dinamicPage < this.totalPage) {
        this.fetchNextPost();
      }
      this.posts = this.posts.filter((post) => post.id !== currentPost.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchNextPost() {
      const nextPost = this.posts[this.posts.length - 1].id + 1;
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${nextPost}`
        );
        this.posts.push(data);
      } catch (error) {
        alert("Ошибка");
      }
    },
    async loadMorePosts() {
      this.dinamicPage += 1;
      if (this.dinamicPage > this.totalPage) return;
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.dinamicPage,
              _limit: this.postsLimitOnPage,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.postsLimitOnPage
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  watch: {},
  mounted() {},
  setup(props) {
    const { posts, totalPage, isPostsLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPage,
      isPostsLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
</script>

<style lang="scss" scoped>
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
.observer {
  margin-top: 20px;
  height: 30px;
  background: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.post-limits {
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.columns__show {
  display: flex;
  align-items: center;
}
</style>
