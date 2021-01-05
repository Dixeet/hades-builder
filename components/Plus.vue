<template>
  <div>
    <div class="h-plus cursor-as-pointer" @click="modalOpen = !modalOpen">
      <b-icon icon="plus" size="is-medium"></b-icon>
    </div>
    <b-modal v-model="modalOpen">
      <slot :close="close"></slot>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    close() {
      this.modalOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/_variables';

.h-plus {
  width: 80px;
  height: 80px;
  text-align: center;
  border: 3px dashed $border;
  color: $grey-light;
  &:hover {
    border: 3px dashed $grey-light;
    color: $grey-lighter;
  }
}
/deep/ {
  .icon {
    height: 100%;
    vertical-align: middle;
  }
}
</style>
