<template>
  <div>
    <div class="card cursor-as-pointer hoverable">
      <div class="card-image">
        <img :src="weapon.image" :alt="weapon.name" />
      </div>
      <div class="card-content has-text-centered">
        {{ weapon.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    weapon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/_variables.scss';

img {
  max-height: 150px;
  display: block;
  margin: 0 auto;
}
</style>
