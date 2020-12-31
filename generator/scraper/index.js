const talentsScraper = require('./talents');
const aphroditeScraper = require('./aphrodite');
const aresScraper = require('./ares');

module.exports = {
  scrapGods() {
    return Promise.all([aphroditeScraper.parse(), aresScraper.parse()]);
  },

  scrapTalents() {
    return talentsScraper.parse();
  },

  async scrap() {
    const [talents, gods] = await Promise.all([talentsScraper.parse(), this.scrapGods()]);
    return {
      talents,
      gods,
    };
  },
};
