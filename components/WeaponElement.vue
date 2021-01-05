<template>
  <div>
    <div class="card">
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
  props: {
    weapon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
img {
  max-height: 150px;
  display: block;
  margin: 0 auto;
}
</style>
