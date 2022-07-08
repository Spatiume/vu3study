<template lang="pug">
form(@submit.prevent)
  h4 Создать пост
  MyInput.form-input(placeholder="Название поста", v-model="post.title")
  MyInput.form-input(placeholder="Описание поста", v-model="post.body")
  MyButton.form-btn(type="button", @click="createPost") Создать
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },

  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}

.form-btn {
  align-self: flex-end;
  margin-top: 15px;
}

.form-input {
  margin-top: 15px;
}
</style>