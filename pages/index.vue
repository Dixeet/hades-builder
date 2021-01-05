<template>
  <section class="section">
    <div class="block">
      <Card title="Weapon">
        <Plus>
          <List class="columns is-multiline m-0" :list="Object.values(weapons)">
            <template #default="{ element: weapon }">
              <WeaponElement class="column is-3" :weapon="weapon"></WeaponElement>
            </template>
          </List>
        </Plus>
      </Card>
    </div>
    <div class="block">
      <Card title="Mirror of Night Talents" :open="false">
        <TalentsPicker :talents="talents" :talents-picked="build.talents" />
      </Card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card';
import TalentsPicker from '../components/TalentsPicker';
import Plus from '../components/Plus';
import List from '../components/List';
import WeaponElement from "~/components/WeaponElement";

export default {
  name: 'HomePage',
  components: {
    WeaponElement,
    TalentsPicker,
    Card,
    Plus,
    List,
  },
  asyncData({ $data, query }) {
    const build = {
      talents: parseQueryTalents($data.talents, query),
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
        this.$router.push({ query: { talents: JSON.stringify(talents) } });
      },
      deep: true,
    },
  },
  methods: {
    test() {
      console.log(this.weapons);
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
</script>
