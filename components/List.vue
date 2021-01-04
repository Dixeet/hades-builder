<template>
  <ul>
    <li v-for="(element, index) in list" :key="index">
      <slot :element="element"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
