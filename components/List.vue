<template>
  <div>
    <template v-for="element in list">
      <slot :element="element"></slot>
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
