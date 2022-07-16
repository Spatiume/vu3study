import axios from "axios"
import { ref, onMounted, computed, onUpdated } from "vue"

export default function usePosts(postsLimitOnPage) {
  const posts = ref([]);
  const totalPage = ref(0);
  const isPostsLoading = ref(false);
  const fetching = async () => {
    try {
      isPostsLoading.value = true;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: postsLimitOnPage.value,
          },
        }
      );
      totalPage.value = Math.ceil(
        response.headers["x-total-count"] / postsLimitOnPage
      );
      posts.value = response.data;
      // this.dinamicPage = this.currentPage;
    } catch (error) {
      alert("Ошибка");
    } finally {
      isPostsLoading.value = false;
    }
  }
  onMounted(fetching)
  return {
    posts, isPostsLoading, totalPage
  }
}