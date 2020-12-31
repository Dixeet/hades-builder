/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Zeus';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Zeus',
    curse: {
      name: 'jolted',
      description: "Victim's next attack self-inflicts lightning damage that harms itself and nearby foes.",
    },
  };
}

module.exports = {
  parse,
};
