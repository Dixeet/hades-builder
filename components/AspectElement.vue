<template>
  <div>
    <div
      class="columns is-vcentered is-centered h-row"
      :class="{ hoverable: !isClosable, 'cursor-as-pointer': !isClosable }"
    >
      <div class="column is-narrow has-text-centered">
        <img :src="aspect.image" :alt="aspect.name" />
      </div>
      <div class="column has-text-centered">
        {{ aspect.name }}
      </div>
      <div class="column has-text-centered">
        <div v-html="aspect.upgrade"></div>
      </div>
      <div
        v-if="isClosable"
        class="column is-narrow has-text-centered cursor-as-pointer h-closable"
        @click="$emit('delete-aspect')"
      >
        <b-icon icon="close"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aspect: {
      type: Object,
      required: true,
    },
    isClosable: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/_variables.scss';

.h-row {
  margin: 0 0 0.75em 0;
  background: $grey-dark;
  border: 1px solid $grey;
}
.h-closable {
  .icon:hover {
    color: $grey-light;
    background: $grey-darker;
  }
}
img {
  max-height: 60px;
}
.column {
  padding: 0.5em;
}
</style>
