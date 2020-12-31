const { parseWeapon } = require('../abstractScraper');

const URL = '/Heart-Seeking_Bow';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Hear-Seeking Bow',
  };
}

module.exports = {
  parse,
};
