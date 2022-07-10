<template lang="pug">
.radio__lists
  slot
  .radio__btns(v-for="option in options", :key="option.value")
    input(
      type="radio",
      :value="option.value",
      :name="radioName",
      :id="option.value",
      @change="changeRadio"
      :checked="option.value == radioDefault"
    )
    label.radio__btn(:for="option.value") {{ option.title }}
</template>
<script>
export default {
  name: "MyRadio",
  props: {
    radioName: {
      type: String,
    },
    modelValue: [String, Number],
    options: {
      type: Array,
      default: () => [],
    },
    radioDefault: {
      type: [String, Number],
      default: '',
    }
  },
  methods: {
    changeRadio(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style lang="scss">
.radio__lists {
  display: flex;
  align-items: center;
}

.radio__btns {
  padding: 10px;
  input[type="radio"] {
    display: none;
  }
}

.radio__btn {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 25px;
  margin-left: 25px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: -25px;
    border: 2px solid teal;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
  &::after {
    content: "\2714";
    color: teal;
    display: none;
    position: absolute;
    top: 1px;
    left: -22px;
  }
}
.radio__btns input[type="radio"]:checked + label:after {
  display: block;
}
</style>