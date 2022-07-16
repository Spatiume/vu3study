import { createRouter, createWebHistory } from "vue-router"
import AboutPage from "./../components/pages/AboutPage"
import PostsPage from './../components/pages/PostsPage.vue'
import PostPage from './../components/pages/PostPage.vue'
import PostsPageWithStore from './../components/pages/PostsPageWithStore.vue'
import PostsPageCompositionApi from "./../components/pages/PostsPageCompositionApi.vue"


const routes = [
  {
    path: '/',
    component: AboutPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/store',
    component: PostsPageWithStore
  },
  {
    path: '/composition',
    component: PostsPageCompositionApi
  },
  {
    path: '/post/:id',
    component: PostPage
  }
]

const router = createRouter(
  {
    routes,
    // history,
    history: createWebHistory(process.env.BASE_URL)
  }
)

export default router;