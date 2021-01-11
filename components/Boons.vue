<template>
  <div>
    <Card title="Boons">
      <div>
        <h4 class="subtitle is-6">Core</h4>
        <Plus #default="{ close }">
          <List #default="{ element: boon }" class="columns is-multiline m-0" :list="boons">
            <div @click="">
              <BoonElement :boon="boon"></BoonElement>
            </div>
          </List>
        </Plus>
      </div>
      <div>
        <h4 class="subtitle is-6">Good with</h4>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/Card';
import Plus from '~/components/Plus';
import BoonElement from '~/components/BoonElement';

export default {
  components: {
    Card,
    Plus,
    BoonElement,
  },
  props: {
    gods: {
      type: Array,
      required: true,
    },
  },
  computed: {
    boons() {
      return this.gods.reduce((acc, row) => acc.concat(row.boons), []);
    },
  },
};
</script>

<style scoped></style>
