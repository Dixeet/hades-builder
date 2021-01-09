<template>
  <b-collapse class="card" animation="slide" :open="open">
    <template #trigger="{ open }">
      <div class="card-header" role="button">
        <img v-if="image" class="ml-2" :src="image" :alt="title" />
        <p class="card-header-title" :class="{ 'pl-1': image }">{{ title }}</p>
        <a class="card-header-icon" @click="close ? $emit('delete') : ''">
          <b-icon v-if="close" icon="close"> </b-icon>
          <b-icon v-else :icon="open ? 'menu-down' : 'menu-up'"> </b-icon>
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
    image: {
      type: String,
      default: () => '',
    },
    close: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 40px;
}
</style>
