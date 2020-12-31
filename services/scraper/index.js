import talentsScraper from '~/services/scraper/talents';
import aphroditeScraper from '~/services/scraper/aphrodite';
import aresScraper from '~/services/scraper/ares';

export default {
  scrapGods() {
    return Promise.all([aphroditeScraper.parse(), aresScraper.parse()]);
  },

  async scrap() {
    const [talents, gods] = await Promise.all([talentsScraper.parse(), this.scrapGods()]);
    return {
      talents,
      gods,
    };
  },
};
