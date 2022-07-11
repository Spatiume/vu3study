<template lang="pug">
.wrapper
  MyButton.btn(@click="$router.go(-1)") Вернуться назад
  .post
    h1.post__title {{ post.title }}
    .post__pic
      img(:src="loremPhoto")
    .post__info
      .post__id Уникальный номер: {{ post.id }}
      .post__body {{ post.body }}
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      post: {
        id: "",
      },
      loremPhoto: "",
    };
  },
  methods: {
    async fetchPostById() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.post.id}`
        );
        this.post = response.data;
      } catch (error) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.post.id = Number(this.$route.params.id);
    this.loremPhoto = `https://picsum.photos/id/${this.post.id+10}/400/250`;
    this.fetchPostById();
  },
};
</script>
  <style lang="scss" scoped>
  .wrapper {
  padding: 5% 15%;
  display: flex;
  flex-direction: column;
}

.btn {
  margin-bottom: 20px;
  align-self: flex-end;
}

.post {
  display: flex;
  flex-direction: column;
  border: 2px solid teal;
  .post__title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 15px;
    border-bottom: 1px solid teal;
  }
}

.post__pic {
  align-self: center;
}

.post__info {
  display: flex;
  flex-direction: column;
  padding: 2% 10%;

  .post__id {
    opacity: 0.8;
    margin-bottom: 10px;
    align-self: flex-end;
  }
}
</style>