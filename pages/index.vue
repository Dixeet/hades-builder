<template>
  <section class="section">
    <b-collapse class="card" animation="slide" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">Mirror of Night Talents</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
      <div class="card-content">
        <TalentsPicker :talents="talents" :talents-picked="build.talents" />
      </div>
    </b-collapse>
  </section>
</template>

<script>
import TalentsPicker from '../components/TalentsPicker';

export default {
  name: 'HomePage',
  components: {
    TalentsPicker,
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
