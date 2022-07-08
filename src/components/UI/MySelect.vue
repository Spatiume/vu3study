<template lang="pug">
select(v-model="modelValue", @change="changeOption")
  option(value="", disabled) Выберите из списка
  option(v-for="option in options", :key="option.value", :value="option.value") {{ option.name }}
</template>
<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style lang="scss">
</style>