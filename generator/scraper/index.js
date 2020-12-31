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
const stygianBladeScraper = require('./weapons/stygianBlade');
const adamantRailScraper = require('./weapons/adamantRail');
const eternalSpearScraper = require('./weapons/eternalSpear');
const heartSeekingBowScraper = require('./weapons/heartSeekingBow');
const shieldOfChaosScraper = require('./weapons/shieldOfChaos');
const twinFistsScraper = require('./weapons/twinFists');

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

  scrapWeapons() {
    return Promise.all([
      stygianBladeScraper.parse(),
      adamantRailScraper.parse(),
      eternalSpearScraper.parse(),
      heartSeekingBowScraper.parse(),
      shieldOfChaosScraper.parse(),
      twinFistsScraper.parse(),
    ]);
  },

  async scrap() {
    const [talents, gods] = await Promise.all([talentsScraper.parse(), this.scrapGods()]);
    return {
      talents,
      gods,
    };
  },
};
