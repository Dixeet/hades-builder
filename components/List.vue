<template>
  <div>
    <template v-for="(element, index) in list">
      <slot :element="element" :index="index"></slot>
    </template>
  </div>
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
