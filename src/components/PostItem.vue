<template lang="pug">
.post
  .post__content
    div
      strong Номер поста:
      span {{ post.id }}
    div
      strong Название:
      span {{ post.title }}
    div
      strong Описание:
      span {{ post.body }}
  .post__btns
    MyButton.post__btn(@click="$router.push(`/post/${post.id}`)") Открыть
    MyButton.post__btn(@click="$emit('remove', post)") Удалить
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.post {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__content {
  width: 70%;
}

.post__btns {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.post__btn {
  padding: 5px;
  margin-top: 5px;

  &:hover {
    padding: 4px;
  }
}
</style>