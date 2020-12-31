/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Dionysus';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Dionysus',
    curse: {
      name: 'hangover',
      description: 'For 4 Seconds, victim takes damage every 0.5 seconds. Effect can stack up to 5 times by default.',
    },
  };
}

module.exports = {
  parse,
};
