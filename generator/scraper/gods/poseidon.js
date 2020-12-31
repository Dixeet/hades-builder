/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Poseidon';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Poseidon',
    curse: {
      name: 'ruptured',
      description: 'For 3 Seconds, victim takes rapid damage every 0.2 seconds while moving.',
    },
  };
}

module.exports = {
  parse,
};
