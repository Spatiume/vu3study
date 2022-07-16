import axios from "axios"

export const postsModule = {
  namespaced: true,
  state() {
    return {
      posts: [],
      isPostsLoading: true,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
        { value: "id", name: "По номеру" },
      ],
      searchQuery: "",
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
      dinamicPage: 1,
      paginationType: "dinamic",
      paginationTypeOptions: [
        { value: "dinamic", title: "Динамично" },
        { value: "perpage", title: "Постранично" },
      ],
      columnsShow: '1',
      columnsShowOptions: [
        { value: "1", title: "В одну колонику" },
        { value: "2", title: "В две колонки" },
      ],
    }
  },
  getters: {
    sortedPosts(state) {
      if (state.selectedSort === "id") {
        // сортировка для чисел
        return [...state.posts].sort((post1, post2) => {
          return post1[state.selectedSort] - post2[state.selectedSort];
        });
      }
      // сортировка для строк
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },

  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsPostsLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setDinamicPage(state, dinamicPage) {
      state.dinamicPage = dinamicPage;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setPostsLimitOnPage(state, postsLimitOnPage) {
      state.postsLimitOnPage = postsLimitOnPage;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPaginationType(state, paginationType) {
      state.paginationType = paginationType;
    },
    setColumnsShow(state, columnsShow) {
      state.columnsShow = columnsShow;
    },
    createPost(state, post) {
      state.posts.unshift(post);
    },
    removePost(state, currentPost) {
      state.posts = state.posts.filter((post) => post.id !== currentPost.id);
    },
    addNextPost(state, post) {
      state.posts.push(post);
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setIsPostsLoading', true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.currentPage,
              _limit: state.postsLimitOnPage,
            },
          }
        );
        commit('setTotalPage', Math.ceil(
          response.headers["x-total-count"] / state.postsLimitOnPage
        ));
        commit('setPosts', response.data)
        commit('setDinamicPage', state.currentPage)
      } catch (error) {
        console.log(error);
      } finally {
        commit('setIsPostsLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      commit('setDinamicPage', state.dinamicPage + 1);
      if (state.dinamicPage > state.totalPage) return;
      try {
        commit('setIsPostsLoading', true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.dinamicPage,
              _limit: state.postsLimitOnPage,
            },
          }
        );
        commit('setTotalPage', Math.ceil(
          response.headers["x-total-count"] / state.postsLimitOnPage
        ))
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.log(error);
      } finally {
        commit('setIsPostsLoading', false);
      }
    },
    async fetchNextPost({ state, commit }) {
      const nextPost = state.posts[state.posts.length - 1].id + 1;
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${nextPost}`
        );
        commit('addNextPost', data)
      } catch (error) {
        console.log(error);
      }
    },
  },

}