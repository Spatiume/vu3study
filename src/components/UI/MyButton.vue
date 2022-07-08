<template lang="pug">
button.btn
  slot
</template>
<script>
export default {
  name: "MyButton",
};
</script>
<style lang="scss">
.btn {
  padding: 10px 15px;
  min-width: 110px;
  background: none;
  color: teal;
  border: 2px solid teal;
  cursor: pointer;

  &:hover {
    border: 3px solid teal;
    padding: 9px 14px;
  }
}
</style>