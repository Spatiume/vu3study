<template lang="pug">
.dialog(v-if="show", @click="hideDialog")
  .dialog__content(@click.stop)
    slot
</template>
<script>
export default {
  name: "MyDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      console.log('click')
      this.$emit("update:show", false);
    },
  },
};
</script>
<style lang="scss">
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 50%;
  padding: 20px;
}
</style>