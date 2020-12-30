import talentsScraper from '~/services/scraper/talents';

export default {
  async scrap() {
    const [talents] = await Promise.all([talentsScraper.parse()]);
    return {
      talents,
    };
  },
};
