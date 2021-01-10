<template>
  <section class="section">
    <div class="block">
      <h2 class="title is-4">Weapon</h2>
      <Weapon
        :weapons="weapons"
        :weapon-picked="build.weapon"
        @delete-weapon="deleteWeapon"
        @choose-weapon="chooseWeapon"
      ></Weapon>
    </div>
    <div class="block">
      <h2 class="title is-4">Talents</h2>
      <Card title="Mirror of Night" :open="false">
        <TalentsPicker :talents="talents" :talents-picked="build.talents" />
      </Card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card';
import TalentsPicker from '~/components/TalentsPicker';
import Weapon from '~/components/Weapon';

export default {
  name: 'HomePage',
  components: {
    TalentsPicker,
    Card,
    Weapon,
  },
  asyncData({ $data, query }) {
    const build = {
      talents: parseQueryTalents($data.talents, query),
      weapon: parseQueryWeapon($data.weapons, query),
    };
    return {
      ...$data,
      build,
    };
  },
  watch: {
    'build.talents': {
      handler() {
        const talents = [];
        this.build.talents.forEach((talent) => {
          if (talent.type) {
            talents.push([talent.id, talent.type === 'red' ? 0 : 1]);
          }
        });
        this.$router.push({ query: { ...this.$route.query, talents: JSON.stringify(talents) } });
      },
      deep: true,
    },
  },
  methods: {
    chooseWeapon(weapon) {
      this.build.weapon = weapon;
      this.$router.push({ query: { ...this.$route.query, weapon: weapon.id } });
    },
    deleteWeapon() {
      this.build.weapon = {};
      const query = { ...this.$route.query };
      delete query.weapon;
      this.$router.push({ query });
    },
  },
};

function parseQueryTalents(talents, query) {
  const buildTalents = talents.map((talent) => ({
    id: talent.id,
    type: '',
  }));
  if (query.talents) {
    const queryTalents = JSON.parse(query.talents);
    queryTalents.forEach((queryTalent) => {
      const id = queryTalent[0];
      const type = queryTalent[1] === 0 ? 'red' : 'green';
      talents.some((talent, index) => {
        if (talent.id === id) {
          buildTalents[index].type = type;
        }
        return talent.id === id;
      });
    });
  }
  return buildTalents;
}

function parseQueryWeapon(weapons, query) {
  if (query.weapon) {
    const weapon = weapons.find((weap) => weap.id === query.weapon) || {};
    if (weapon.id && query.aspect) {
      const aspect = weapon.aspects.find((asp) => asp.id === query.aspect);
      if (aspect) {
        weapon.aspectPicked = aspect;
      } else {
        const queryCopy = { ...this.$route.query };
        delete queryCopy.aspect;
        this.$router.push({ query: queryCopy });
      }
    }
    return weapon;
  }
  return {};
}
</script>
