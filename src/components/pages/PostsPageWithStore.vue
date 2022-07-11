<template lang="pug">
.posts-page
  h1 Страница с постами {{ currentPage }}
  MyInput.input__search(
    placeholder="Поиск...",
    :model-value="serchQuery",
    @update:model-value="setSerchQuery"
  )
  .app__btns
    MyButton.create-btn(@click="showDialog") Создать пост
    .app__sort.posts-sort
      .sort__title Сортировать по:
      MySelect(
        @update:modelValue="setSelectedSort",
        :modelValue="selectedSort",
        :options="sortOptions"
      )
  .app__btns.post-limits
    MyRadio(
      :options="paginationTypeOptions",
      :radioName="paginationType",
      :radioDefault="paginationType",
      :model-value="paginationType",
      @update:model-value="setPaginationType"
    ) Показывать:
    .app__sort(v-show="paginationType == 'perpage'")
      .sort__title Кол-во постов на странице:
      MySelect(
        :model-value="postsLimitOnPage",
        @update:model-value.number="setPostsLimitOnPage",
        :options="postsLimits"
      )
  MyDialog(v-model:show="dialogVisible")
    PostForm(@create="createNewPost")
  PostList(:posts="sortedAndSearchedPosts", @remove="removeCurrentPost")
  .posts__loading(v-if="isPostsLoading")
    h4 Идёт загрузка...
    MyLoading
  .observer(
    v-intersection="(loadMorePosts), this.dinamicPage",
    v-show="!isPostsLoading && paginationType == 'dinamic'"
  ) Мы загрузили всё что могли...
  PageList(
    v-show="paginationType == 'perpage'",
    :totalPage="totalPage",
    :currentPage="currentPage",
    :model-value="currentPage",
    @update:model-value="setCurrentPage"
  )
</template>

<script>
import PostForm from "../PostForm.vue";
import PostList from "../PostList.vue";
import PageList from "../PageList.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    PageList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      isPostsLoading: (state) => state.posts.isPostsLoading,
      selectedSort: (state) => state.posts.selectedSort,
      sortOptions: (state) => state.posts.sortOptions,
      serchQuery: (state) => state.posts.serchQuery,
      postsLimitOnPage: (state) => state.posts.postsLimitOnPage,
      postsLimits: (state) => state.posts.postsLimits,
      currentPage: (state) => state.posts.currentPage,
      totalPage: (state) => state.posts.totalPage,
      dinamicPage: (state) => state.posts.dinamicPage,
      paginationType: (state) => state.posts.paginationType,
      paginationTypeOptions: (state) => state.posts.paginationTypeOptions,
    }),
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      sortedAndSearchedPosts: "posts/sortedAndSearchedPosts",
    }),
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "posts/setCurrentPage",
      setSerchQuery: "posts/setSerchQuery",
      setPaginationType: "posts/setPaginationType",
      setPostsLimitOnPage: "posts/setPostsLimitOnPage",
      setSelectedSort: "posts/setSelectedSort",
      createPost: "posts/createPost",
      removePost: "posts/removePost",
    }),
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
      loadMorePosts: "posts/loadMorePosts",
      fetchNextPost: "posts/fetchNextPost",
    }),

    createNewPost(post) {
      this.createPost(post);
      this.dialogVisible = false;
    },
    removeCurrentPost(post) {
      this.fetchNextPost();
      this.removePost(post);
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },
  watch: {
    postsLimitOnPage() {
      this.setCurrentPage(1);
      this.fetchPosts();
    },
    currentPage() {
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
    // console.log(this.$refs.observer);
  },
};
</script>

<style lang="scss">
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
</style>
