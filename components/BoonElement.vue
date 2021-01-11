<template>
  <div>
    <div
      class="columns is-vcentered is-centered h-row"
      :class="{ hoverable: !isClosable, 'cursor-as-pointer': !isClosable }"
    >
      <div class="column is-narrow has-text-centered">
        <img :src="boon.image" :alt="boon.name" />
      </div>
      <div class="column has-text-centered is-narrow h-name">
        {{ boon.name }}
      </div>
      <div class="column has-text-centered">
        <div v-html="boon.description"></div>
      </div>
      <div class="column has-text-centered">
        <table class="table is-bordered is-striped">
          <tbody>
            <tr>
              <td>common</td>
              <td>{{ boon.rarity.common }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="boon.notes" class="column has-text-centered">
        <div v-html="boon.notes"></div>
      </div>
      <div
        v-if="isClosable"
        class="column is-narrow has-text-centered cursor-as-pointer h-closable"
        @click="$emit('delete-boon')"
      >
        <b-icon icon="close"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boon: {
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
