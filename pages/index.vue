<template>
  <div>Home</div>
</template>

<script>
import scraper from '~/services/scraper';

export default {
  name: 'HomePage',
  async mounted() {
    const scraps = await scraper.scrap();
    console.log(scraps);
  },
};
</script>
