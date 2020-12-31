const talentsScraper = require('./talents');
const aphroditeScraper = require('./gods/aphrodite');
const aresScraper = require('./gods/ares');
const artemisScraper = require('./gods/artemis');
const athenaScraper = require('./gods/athena');
const chaosScraper = require('./gods/chaos');
const demeterScraper = require('./gods/demeter');
const dionysusScraper = require('./gods/dionysus');
const hermesScraper = require('./gods/hermes');
const poseidonScraper = require('./gods/poseidon');
const zeusScraper = require('./gods/zeus');

module.exports = {
  scrapGods() {
    return Promise.all([
      aphroditeScraper.parse(),
      aresScraper.parse(),
      artemisScraper.parse(),
      athenaScraper.parse(),
      chaosScraper.parse(),
      demeterScraper.parse(),
      dionysusScraper.parse(),
      hermesScraper.parse(),
      poseidonScraper.parse(),
      zeusScraper.parse(),
    ]);
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
