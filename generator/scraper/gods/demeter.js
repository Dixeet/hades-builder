/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Demeter';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Demeter',
    curse: {
      name: 'chill',
      description: 'Victim is slowed by 4%. Effect can stack up to 10 times.',
    },
  };
}

module.exports = {
  parse,
};
