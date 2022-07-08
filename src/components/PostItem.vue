<template lang="pug">
.post
  .post__content
    div
      strong Название:
      span {{ post.title }}
    div
      strong Описание:
      span {{ post.body }}
  .post__btn
    MyButton(@click="$emit('remove', post)") Удалить
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
<style lang="scss">
.post {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>