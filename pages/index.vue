<template>
  <div>Home</div>
</template>

<script>
import scraper from '~/services/scraper';

export default {
  name: 'HomePage',
  async mounted() {
    await scraper.scrap();
  },
};
</script>
