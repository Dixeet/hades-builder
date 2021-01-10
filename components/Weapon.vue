<template>
  <div>
    <Plus v-if="!weaponPicked.id" #default="{ close }">
      <List #default="{ element: weapon }" class="columns is-multiline m-0" :list="weapons">
        <div class="column is-3" @click="chooseWeapon(weapon, close)">
          <WeaponElement :weapon="weapon"></WeaponElement>
        </div>
      </List>
    </Plus>
    <Card v-else close :title="weaponPicked.name" :image="weaponPicked.image" @delete="$emit('delete-weapon')">
      <h3 class="subtitle">Aspect</h3>
      <Plus v-if="!weaponPicked.aspectPicked || !weaponPicked.aspectPicked.id" #default="{ close }">
        <List #default="{ element: aspect }" :list="weaponPicked.aspects">
          <div @click="chooseAspect(aspect, close)">
            <AspectElement :aspect="aspect"></AspectElement>
          </div>
        </List>
      </Plus>
      <div v-else>
        <AspectElement is-closable :aspect="weaponPicked.aspectPicked" @delete-aspect="deleteAspect"></AspectElement>
      </div>
    </Card>
  </div>
</template>

<script>
import Plus from '~/components/Plus';
import Card from '~/components/Card';
import List from '~/components/List';
import WeaponElement from '~/components/WeaponElement';
import AspectElement from '~/components/AspectElement';

export default {
  components: {
    Plus,
    Card,
    List,
    WeaponElement,
    AspectElement,
  },
  props: {
    weapons: {
      type: Array,
      required: true,
    },
    weaponPicked: {
      type: Object,
      required: true,
    },
  },
  methods: {
    chooseWeapon(weapon, close) {
      close();
      this.$emit('choose-weapon', weapon);
    },
    chooseAspect(aspect, close) {
      close();
      this.$set(this.weaponPicked, 'aspectPicked', aspect);
      const query = { ...this.$route.query, aspect: aspect.id };
      this.$router.push({ query });
    },
    deleteAspect() {
      this.$set(this.weaponPicked, 'aspectPicked', undefined);
      const query = { ...this.$route.query };
      delete query.aspect;
      this.$router.push({ query });
    },
  },
};
</script>

<style scoped></style>
