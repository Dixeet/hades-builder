/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Athena';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Athena',
    curse: {
      name: 'exposed',
      description: 'For 5 Seconds, victim takes more damage when struck from behind.',
    },
  };
}

module.exports = {
  parse,
};
