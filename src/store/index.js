import { createStore } from "vuex"
import { postsModule } from "./postsModule"

export default createStore({
  modules: {
    posts: postsModule
  },
})