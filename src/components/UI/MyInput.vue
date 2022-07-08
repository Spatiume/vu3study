<template lang="pug">
input.input(:value="modelValue", @input="updateInput", type="text") 
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style lang="scss">
.input {
  width: 100%;
  border: 2px solid teal;
  padding: 10px 15px;
}
</style>