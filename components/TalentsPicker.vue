<template>
  <div>
    <b-field v-for="(talent, index) in talents" :key="talent.id">
      <b-radio-button v-model="talentsPicked[index].type" native-value="red">
        <div class="columns is-mobile is-vcentered">
          <div class="column is-3"><div v-html="talent.red.ability"></div></div>
          <div class="column is-hidden-mobile"><div v-html="talent.red.description"></div></div>
          <div class="column is-hidden-mobile is-3"><div v-html="talent.red.ranks"></div></div>
        </div>
      </b-radio-button>
      <b-radio-button v-model="talentsPicked[index].type" native-value="green">
        <div class="columns is-mobile is-vcentered">
          <div class="column is-3"><div v-html="talent.green.ability"></div></div>
          <div class="column is-hidden-mobile"><div v-html="talent.green.description"></div></div>
          <div class="column is-hidden-mobile is-3"><div v-html="talent.green.ranks"></div></div>
        </div>
      </b-radio-button>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    talents: {
      type: Array,
      required: true,
    },
    talentsPicked: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
input {
  display: none;
}
/deep/ {
  input {
    display: none;
  }
  .control {
    flex: none;
    width: 50%;
  }
  .b-radio.radio.button {
    display: block;
    white-space: normal;
    height: 100%;
    .columns {
      margin-top: 0;
      margin-bottom: 0;
      height: 100%;
    }
  }
  img {
    vertical-align: middle;
  }
  .image {
    display: inline;
  }
  .image img {
    display: inline;
    width: auto;
  }
}
</style>
