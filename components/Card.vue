<template>
  <b-collapse class="card" animation="slide" :open="open">
    <template #trigger="{ open }">
      <div class="card-header" role="button">
        <p class="card-header-title">{{ title }}</p>
        <a class="card-header-icon">
          <b-icon :icon="open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
    </template>
    <div class="card-content">
      <slot></slot>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => '',
    },
    open: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>

<style scoped></style>
