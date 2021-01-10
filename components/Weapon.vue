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
      <h3 class="subtitle">Daedalus Hammer Upgrades</h3>
      <div>
        <h4 class="subtitle is-6">Best</h4>
        <List #default="{ element: upgrade, index }" :list="weaponPicked.bestUpgrades">
          <UpgradeElement
            is-closable
            :upgrade="upgrade"
            @delete-upgrade="deleteUpgrade('bestUpgrades', index)"
          ></UpgradeElement>
        </List>
        <Plus v-if="weaponPicked.bestUpgrades.length < 2" #default="{ close }">
          <List #default="{ element: upgrade }" :list="updatedUpgradesList">
            <div @click="chooseUpgrade(upgrade, 'bestUpgrades', close)">
              <UpgradeElement :upgrade="upgrade"></UpgradeElement>
            </div>
          </List>
        </Plus>
      </div>
      <div>
        <h4 class="subtitle is-6">Good</h4>
        <List #default="{ element: upgrade, index }" :list="weaponPicked.goodUpgrades">
          <UpgradeElement
            is-closable
            :upgrade="upgrade"
            @delete-upgrade="deleteUpgrade('goodUpgrades', index)"
          ></UpgradeElement>
        </List>
        <Plus #default="{ close }">
          <List #default="{ element: upgrade }" :list="updatedUpgradesList">
            <div @click="chooseUpgrade(upgrade, 'goodUpgrades', close)">
              <UpgradeElement :upgrade="upgrade"></UpgradeElement>
            </div>
          </List>
        </Plus>
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
import UpgradeElement from '~/components/UpgradeElement';

export default {
  components: {
    Plus,
    Card,
    List,
    WeaponElement,
    AspectElement,
    UpgradeElement,
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
  computed: {
    updatedUpgradesList() {
      return this.weaponPicked.upgrades.filter(
        (upgrade) =>
          !this.weaponPicked.bestUpgrades.find((upg) => upg.id === upgrade.id) &&
          !this.weaponPicked.goodUpgrades.find((upg) => upg.id === upgrade.id),
      );
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
    chooseUpgrade(upgrade, attr, close) {
      close();
      this.weaponPicked[attr].push(upgrade);
      this.updateQueryUpgrade(attr);
    },
    deleteUpgrade(attr, index) {
      this.weaponPicked[attr].splice(index, 1);
      this.updateQueryUpgrade(attr);
    },
    updateQueryUpgrade(attr) {
      const query = { ...this.$route.query };
      if (!this.weaponPicked[attr].length && this.weaponPicked[attr]) {
        delete query[attr];
      } else {
        query[attr] = JSON.stringify(this.weaponPicked[attr].map((upgr) => upgr.id));
      }
      this.$router.push({ query });
    },
  },
};
</script>

<style scoped></style>
