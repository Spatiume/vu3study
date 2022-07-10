<template lang="pug">
.page__wrapper
  button.page(
    type="button",
    v-for="pageNumber in totalPage",
    :key="pageNumber",
    @click="changeCurrentPage(pageNumber)",
    :class="{ 'current-page': currentPage === pageNumber }"
    :value="pageNumber"
  ) {{ pageNumber }}
</template>
<script>
export default {
  props: {
    totalPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  methods:{
    changeCurrentPage(pageNumber){
      this.$emit('update:currentPage', pageNumber)
    }
    
  }
};
</script>
<style lang="scss">
.page__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 0 25%;
}

.page {
  width: 30px;
  border: 1px solid black;
  padding: 8px;
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
  color: teal;
}
</style>