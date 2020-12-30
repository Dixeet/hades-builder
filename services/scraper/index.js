import talentsScraper from '~/services/scraper/talents';
import aphroditeScraper from '~/services/scraper/aphrodite';

export default {
  async scrap() {
    const [talents, aphrodite] = await Promise.all([talentsScraper.parse(), aphroditeScraper.parse()]);
    return {
      talents,
      aphrodite,
    };
  },
};
